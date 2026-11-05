
const express = require('express');
const router = express.Router();

const reporteController = require('../controllers/reporteController');
const { verificarToken, soloAdmin } = require('../middleware/authMiddleware');

// Consultar todos los reportes
router.get('/', reporteController.obtenerTodos);

// Consultar mis reportes (usuario autenticado)
router.get('/mis-reportes', verificarToken, reporteController.obtenerMisReportes);

// Consultar un reporte por ID
router.get('/:id', reporteController.obtenerPorId);

// Crear reporte (usuario autenticado)
router.post('/', verificarToken, reporteController.crear);

// Actualizar reporte (propietario o administrador)
router.put('/:id', verificarToken, reporteController.actualizar);

// Cambiar estado (solo administrador)
router.patch('/:id/estado', verificarToken, soloAdmin, reporteController.cambiarEstado);

module.exports = router;
