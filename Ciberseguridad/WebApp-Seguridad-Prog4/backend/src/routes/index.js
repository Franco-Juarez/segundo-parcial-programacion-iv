const express = require('express');
const csrf = require('csurf');
const router = express.Router();

// Configurar CSRF protection
const csrfProtection = csrf({ cookie: false });

// Importar todas las rutas
const authRoutes = require('./auth');
const productRoutes = require('./products');
const captchaRoutes = require('./captcha');

// CSRF Token endpoint - debe estar ANTES de las rutas protegidas
router.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Usar las rutas
router.use('/', authRoutes);
router.use('/', productRoutes);
router.use('/', captchaRoutes);

// Importar rutas de vulnerabilidades con CSRF
const vulnerabilityRoutes = require('./vulnerabilities');
router.use('/', vulnerabilityRoutes(csrfProtection)); // Pasar csrf como parámetro

// Ruta de prueba
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando correctamente' });
});

module.exports = router;
