
const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const { verificarToken, soloAdmin } = require('../middleware/authMiddleware');

// Proteger todas las rutas de usuarios
router.use(verificarToken, soloAdmin);

// Consultar usuarios
router.get('/', usuarioController.obtenerTodos);

// Consultar usuario por ID
router.get('/:id', usuarioController.obtenerPorId);

// Crear usuario
router.post('/', usuarioController.crear);

// Modificar usuario
router.put('/:id', usuarioController.actualizar);

// Cambiar contraseña
router.patch('/:id/contrasena', usuarioController.cambiarContrasena);

// Desactivar usuario
router.patch('/:id/desactivar', usuarioController.desactivar);

// Activar usuario
router.patch('/:id/activar', usuarioController.activar);

// Eliminar usuario
router.delete('/:id', usuarioController.eliminar);

module.exports = router;
