const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');

// Rate limiter para protección contra brute force
// Permite más intentos para que el controller maneje delay y CAPTCHA primero
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Alto para permitir testing, el controller maneja el límite real
  standardHeaders: true,
  legacyHeaders: false,
});

// Rutas de autenticación
router.post('/login', loginLimiter, authController.login);
router.post('/register', authController.register);
router.post('/auth/verify', authController.verifyToken);
router.post('/check-username', authController.checkUsername);

module.exports = router;
