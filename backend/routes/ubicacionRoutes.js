
const express = require('express');
const router = express.Router();

const ubicacionController = require('../controllers/ubicacionController');
const { verificarToken, soloAdmin } = require('../middleware/authMiddleware');


router.get('/', ubicacionController.obtenerTodas);


router.post('/', verificarToken, soloAdmin, ubicacionController.crear);
router.put('/:id', verificarToken, soloAdmin, ubicacionController.actualizar);
router.patch('/:id/desactivar', verificarToken, soloAdmin, ubicacionController.desactivar);

module.exports = router;
