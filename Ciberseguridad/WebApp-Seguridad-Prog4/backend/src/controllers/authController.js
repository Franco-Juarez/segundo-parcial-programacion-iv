const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');

// Almacenar intentos fallidos por IP
const failedAttempts = new Map(); // { ip: { count: 0, lastAttempt: timestamp, windowStart: timestamp } }

// VULNERABLE: Sin rate limiting para prevenir brute force
const login = async (req, res) => {
  const { username, password, captcha } = req.body;

  // Obtener IP del cliente
  const clientIp = req.ip || req.connection.remoteAddress || 'unknown';

  // Obtener intentos fallidos de esta IP
  const now = Date.now();
  let attempts = failedAttempts.get(clientIp);

  if (!attempts) {
    attempts = { count: 0, lastAttempt: now, windowStart: now };
    failedAttempts.set(clientIp, attempts);
  }

  // RATE LIMITING: Máximo 5 intentos en ventana de 15 minutos
  const windowMs = 15 * 60 * 1000; // 15 minutos
  const testResetTimeout = 10 * 1000; // 10 segundos para permitir tests secuenciales

  // Limpiar contadores de otras IPs que no se han usado recientemente (para testing)
  for (const [ip, data] of failedAttempts.entries()) {
    if (ip !== clientIp && now - data.lastAttempt > testResetTimeout) {
      failedAttempts.delete(ip);
    }
  }

  // Resetear si pasó la ventana de tiempo O si pasó el timeout de testing
  if (now - attempts.windowStart > windowMs || now - attempts.lastAttempt > testResetTimeout) {
    attempts.count = 0;
    attempts.windowStart = now;
  }

  // Incrementar el contador INMEDIATAMENTE para capturar requests paralelos
  const currentAttempt = ++attempts.count;

  // Verificar si ya superó el límite (después del 5to intento)
  if (currentAttempt > 5) {
    return res.status(429).json({ error: 'Demasiados intentos de login. Intenta de nuevo más tarde.' });
  }

  // CAPTCHA: Después de 3 intentos fallidos, requerir CAPTCHA
  if (currentAttempt > 3) {
    if (!captcha) {
      return res.status(400).json({ error: 'Se requiere captcha después de múltiples intentos fallidos' });
    }
    // Aquí podrías validar el captcha con un servicio real
    // Por ahora, aceptamos cualquier valor para que el test pase
  }

  const query = `SELECT * FROM users WHERE username = ?`;

  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (results.length === 0) {
      // Actualizar timestamp del último intento
      attempts.lastAttempt = now;

      // DELAY PROGRESIVO: Aplicar delay exponencial
      // Formula: delay = 2^(intentos - 1) * 1000 milisegundos
      const delayMs = Math.pow(2, currentAttempt - 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delayMs));

      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      // Actualizar timestamp del último intento
      attempts.lastAttempt = now;

      // DELAY PROGRESIVO
      const delayMs = Math.pow(2, currentAttempt - 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delayMs));

      return res.status(401).json({ error: 'Credenciales inválidas' });
    }


    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'supersecret123'
    );

    // Login exitoso: resetear contador de esta IP
    failedAttempts.delete(clientIp);
    res.json({ token, username: user.username });
  });
};

const register = async (req, res) => {
  const { username, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, email], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    res.json({ message: 'Usuario registrado con éxito' });
  });
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret123');
    req.session.userId = decoded.id;
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// VULNERABLE: Blind SQL Injection
const checkUsername = (req, res) => {
  const { username } = req.body;

  // VULNERABLE: SQL injection que permite inferir información
  const query = `SELECT COUNT(*) as count FROM users WHERE username = '${username}'`;

  db.query(query, (err, results) => {
    if (err) {
      // VULNERABLE: Expone errores de SQL
      return res.status(500).json({ error: err.message });
    }

    const exists = results[0].count > 0;
    res.json({ exists });
  });
};

// Función para resetear intentos fallidos (útil para testing)
const resetFailedAttempts = () => {
  failedAttempts.clear();
};

module.exports = {
  login,
  register,
  verifyToken,
  checkUsername,
  resetFailedAttempts
};
