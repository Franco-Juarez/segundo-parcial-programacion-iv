const express = require('express');
const vulnerabilityController = require('../controllers/vulnerabilityController');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');

// Crear router base
const createRouter = (csrfProtection) => {
  const router = express.Router();

  // Command Injection
  router.post('/ping', vulnerabilityController.ping);

  // CSRF - Transferencia (protegida con CSRF si está disponible)
  if (csrfProtection) {
    router.post('/transfer', csrfProtection, vulnerabilityController.transfer);
  } else {
    router.post('/transfer', vulnerabilityController.transfer);
  }

  // Local File Inclusion
  router.get('/file', vulnerabilityController.readFile);

  // File Upload
  router.post('/upload', uploadMiddleware, uploadFile);

  return router;
};

// Exportar como router por defecto (para compatibilidad con tests)
module.exports = createRouter();

// También exportar como función
module.exports = createRouter;
