
const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categoriaController');
const { verificarToken, soloAdmin } = require('../middleware/authMiddleware');

// Consultar categorías
router.get('/', categoriaController.obtenerTodas);

// Operaciones exclusivas del administrador
router.post('/', verificarToken, soloAdmin, categoriaController.crear);
router.put('/:id', verificarToken, soloAdmin, categoriaController.actualizar);
router.patch('/:id/desactivar', verificarToken, soloAdmin, categoriaController.desactivar);
router.patch('/:id/activar', verificarToken, soloAdmin, categoriaController.activar);

module.exports = router;
