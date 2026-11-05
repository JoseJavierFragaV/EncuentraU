
const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Iniciar sesión
const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        // Validar campos obligatorios
        if (!correo || !contrasena) {
            return res.status(400).json({
                mensaje: 'Ingrese el correo y la contraseña'
            });
        }

        // Buscar usuario por correo
        const usuario = await usuarioModel.obtenerPorCorreo(
            correo.toLowerCase().trim()
        );

        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        // Verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(403).json({
                mensaje: 'El usuario se encuentra desactivado'
            });
        }

        // Comparar contraseña
        const contrasenaValida = await bcrypt.compare(
            contrasena,
            usuario.contrasena
        );

        if (!contrasenaValida) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        // Generar token JWT
        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                correo: usuario.correo,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1d'
            }
        );

        // Responder con el token y los datos del usuario
        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error('Error en el login:', error.message);

        res.status(500).json({
            mensaje: 'Error interno al iniciar sesión'
        });
    }
};

module.exports = {
    login
};
