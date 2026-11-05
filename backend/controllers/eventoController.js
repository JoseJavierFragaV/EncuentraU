
const Evento = require('../models/eventoModel');

// Consultar todos los eventos
const obtenerTodos = async (req, res) => {
    try {
        const eventos = await Evento.obtenerTodos();
        res.json(eventos);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            mensaje: 'Error al consultar eventos'
        });
    }
};

// Crear evento
const crear = async (req, res) => {
    try {
        const { nombre, descripcion, fecha_evento } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre del evento es obligatorio'
            });
        }

        const evento = await Evento.crear(
            nombre.trim(),
            descripcion || null,
            fecha_evento || null
        );

        res.status(201).json(evento);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            mensaje: 'Error al crear evento'
        });
    }
};

// Modificar evento
const actualizar = async (req, res) => {
    try {
        const { nombre, descripcion, fecha_evento } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre del evento es obligatorio'
            });
        }

        const evento = await Evento.actualizar(
            req.params.id,
            nombre.trim(),
            descripcion || null,
            fecha_evento || null
        );

        if (!evento) {
            return res.status(404).json({
                mensaje: 'Evento no encontrado'
            });
        }

        res.json(evento);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            mensaje: 'Error al actualizar evento'
        });
    }
};

// Desactivar evento
const desactivar = async (req, res) => {
    try {
        const evento = await Evento.desactivar(req.params.id);

        if (!evento) {
            return res.status(404).json({
                mensaje: 'Evento no encontrado'
            });
        }

        res.json({
            mensaje: 'Evento desactivado correctamente',
            evento
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            mensaje: 'Error al desactivar evento'
        });
    }
};

module.exports = {
    obtenerTodos,
    crear,
    actualizar,
    desactivar
};
