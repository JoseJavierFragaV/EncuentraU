
const express = require('express');
const router = express.Router();

const eventoController = require('../controllers/eventoController');
const { verificarToken, soloAdmin } = require('../middleware/authMiddleware');

router.get('/', eventoController.obtenerTodos);


router.post('/', verificarToken, soloAdmin, eventoController.crear);
router.put('/:id', verificarToken, soloAdmin, eventoController.actualizar);
router.patch('/:id/desactivar', verificarToken, soloAdmin, eventoController.desactivar);

module.exports = router;
