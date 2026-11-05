
const Categoria = require('../models/categoriaModel');

// Consultar categorías
const obtenerTodas = async (req, res) => {
    try {
        const categorias = await Categoria.obtenerTodas();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar categorías' });
    }
};

// Crear categoría
const crear = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre es obligatorio'
            });
        }

        const categoria = await Categoria.crear(
            nombre.trim(),
            descripcion || null
        );

        res.status(201).json(categoria);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear categoría. Verifica que no exista el nombre.'
        });
    }
};

// Modificar categoría
const actualizar = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre es obligatorio'
            });
        }

        const categoria = await Categoria.actualizar(
            req.params.id,
            nombre.trim(),
            descripcion || null
        );

        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        res.json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar categoría' });
    }
};

// Desactivar categoría
const desactivar = async (req, res) => {
    try {
        const categoria = await Categoria.desactivar(req.params.id);

        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        res.json({ mensaje: 'Categoría desactivada correctamente', categoria });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al desactivar categoría' });
    }
};

// Activar categoría
const activar = async (req, res) => {
    try {
        const categoria = await Categoria.activar(req.params.id);

        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        res.json({ mensaje: 'Categoría activada correctamente', categoria });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al activar categoría' });
    }
};

module.exports = {
    obtenerTodas,
    crear,
    actualizar,
    desactivar,
    activar
};
