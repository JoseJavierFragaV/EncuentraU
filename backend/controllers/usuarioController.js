
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');

// Consultar todos los usuarios
const obtenerTodos = async (req, res) => {
    try {
        const usuarios = await Usuario.obtenerTodos();
        res.json(usuarios);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error al consultar usuarios' });
    }
};

// Consultar usuario por ID
const obtenerPorId = async (req, res) => {
    try {
        const usuario = await Usuario.obtenerPorId(req.params.id);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error al consultar usuario' });
    }
};

// Crear usuario
const crear = async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasena, rol } = req.body;

        if (!nombre || !apellido || !correo || !contrasena) {
            return res.status(400).json({
                mensaje: 'Todos los campos obligatorios deben completarse'
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
            return res.status(400).json({
                mensaje: 'El correo electrónico no es válido'
            });
        }

        if (contrasena.length < 8) {
            return res.status(400).json({
                mensaje: 'La contraseña debe tener al menos 8 caracteres'
            });
        }

        const rolUsuario = rol || 'USUARIO';

        if (!['USUARIO', 'ADMIN'].includes(rolUsuario)) {
            return res.status(400).json({
                mensaje: 'El rol debe ser USUARIO o ADMIN'
            });
        }

        const hash = await bcrypt.hash(contrasena, 10);

        const usuario = await Usuario.crear(
            nombre.trim(),
            apellido.trim(),
            correo.trim().toLowerCase(),
            hash,
            rolUsuario
        );

        res.status(201).json(usuario);
    } catch (error) {
        console.error(error.message);

        if (error.code === '23505') {
            return res.status(409).json({
                mensaje: 'El correo electrónico ya está registrado'
            });
        }

        res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
};

// Modificar usuario
const actualizar = async (req, res) => {
    try {
        const { nombre, apellido, correo, rol } = req.body;

        if (!nombre || !apellido || !correo) {
            return res.status(400).json({
                mensaje: 'Nombre, apellido y correo son obligatorios'
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
            return res.status(400).json({
                mensaje: 'El correo electrónico no es válido'
            });
        }

        const rolUsuario = rol || 'USUARIO';

        if (!['USUARIO', 'ADMIN'].includes(rolUsuario)) {
            return res.status(400).json({
                mensaje: 'El rol debe ser USUARIO o ADMIN'
            });
        }

        const usuario = await Usuario.actualizar(
            req.params.id,
            nombre.trim(),
            apellido.trim(),
            correo.trim().toLowerCase(),
            rolUsuario
        );

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error.message);

        if (error.code === '23505') {
            return res.status(409).json({
                mensaje: 'El correo electrónico ya está registrado'
            });
        }

        res.status(500).json({ mensaje: 'Error al actualizar usuario' });
    }
};

// Cambiar contraseña
const cambiarContrasena = async (req, res) => {
    try {
        const { contrasena } = req.body;

        if (!contrasena || contrasena.length < 8) {
            return res.status(400).json({
                mensaje: 'La contraseña debe tener al menos 8 caracteres'
            });
        }

        const hash = await bcrypt.hash(contrasena, 10);

        const usuario = await Usuario.actualizarContrasena(
            req.params.id,
            hash
        );

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json({ mensaje: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error al cambiar contraseña' });
    }
};

// Desactivar usuario
const desactivar = async (req, res) => {
    try {
        const usuario = await Usuario.desactivar(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json({
            mensaje: 'Usuario desactivado correctamente',
            usuario
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error al desactivar usuario' });
    }
};

// Activar usuario
const activar = async (req, res) => {
    try {
        const usuario = await Usuario.activar(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json({
            mensaje: 'Usuario activado correctamente',
            usuario
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: 'Error al activar usuario' });
    }
};

// Eliminar usuario
const eliminar = async (req, res) => {
    try {
        const usuario = await Usuario.eliminar(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json({
            mensaje: 'Usuario eliminado correctamente',
            usuario
        });
    } catch (error) {
        console.error(error.message);

        if (error.code === '23503') {
            return res.status(409).json({
                mensaje: 'No se puede eliminar este usuario porque tiene registros relacionados. Puedes desactivarlo.'
            });
        }

        res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    cambiarContrasena,
    desactivar,
    activar,
    eliminar
};
