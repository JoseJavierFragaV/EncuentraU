const Ubicacion = require('../models/ubicacionModel');

// Consultar todas las ubicaciones
const obtenerTodas = async (req, res) => {
    try {
        const ubicaciones = await Ubicacion.obtenerTodas();
        res.json(ubicaciones);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            mensaje: 'Error al consultar ubicaciones'
        });
    }
};

// Crear ubicación
const crear = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre es obligatorio'
            });
        }

        const ubicacion = await Ubicacion.crear(
            nombre.trim(),
            descripcion || null
        );

        res.status(201).json(ubicacion);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            mensaje: 'Error al crear ubicación. Verifica que no exista el nombre.'
        });
    }
};

// Modificar ubicación
const actualizar = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre es obligatorio'
            });
        }

        const ubicacion = await Ubicacion.actualizar(
            req.params.id,
            nombre.trim(),
            descripcion || null
        );

        if (!ubicacion) {
            return res.status(404).json({
                mensaje: 'Ubicación no encontrada'
            });
        }

        res.json(ubicacion);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            mensaje: 'Error al actualizar ubicación'
        });
    }
};

// Desactivar ubicación
const desactivar = async (req, res) => {
    try {
        const ubicacion = await Ubicacion.desactivar(req.params.id);

        if (!ubicacion) {
            return res.status(404).json({
                mensaje: 'Ubicación no encontrada'
            });
        }

        res.json({
            mensaje: 'Ubicación desactivada correctamente',
            ubicacion
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            mensaje: 'Error al desactivar ubicación'
        });
    }
};

module.exports = {
    obtenerTodas,
    crear,
    actualizar,
    desactivar
};