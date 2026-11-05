
const jwt = require('jsonwebtoken');

// Verificar el token de acceso
const verificarToken = (req, res, next) => {
    try {
        const encabezado = req.headers.authorization;

        if (!encabezado || !encabezado.startsWith('Bearer ')) {
            return res.status(401).json({
                mensaje: 'Acceso denegado. Debe iniciar sesión'
            });
        }

        const token = encabezado.split(' ')[1];

        const datosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = datosUsuario;

        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });
    }
};

// Permitir acceso únicamente a administradores
const soloAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'ADMIN') {
        return res.status(403).json({
            mensaje: 'No tiene permisos de administrador'
        });
    }

    next();
};

module.exports = {
    verificarToken,
    soloAdmin
};
