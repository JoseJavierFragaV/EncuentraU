
const pool = require('../config/database');

// Consultar todos los usuarios sin mostrar contraseñas
const obtenerTodos = async () => {
    const resultado = await pool.query(
        `SELECT id_usuario, nombre, apellido, correo, rol, estado, fecha_creacion
         FROM usuario
         ORDER BY id_usuario`
    );
    return resultado.rows;
};

// Consultar un usuario por su ID
const obtenerPorId = async (id) => {
    const resultado = await pool.query(
        `SELECT id_usuario, nombre, apellido, correo, rol, estado, fecha_creacion
         FROM usuario
         WHERE id_usuario = $1`,
        [id]
    );
    return resultado.rows[0];
};

// Consultar usuario por correo para iniciar sesión
const obtenerPorCorreo = async (correo) => {
    const resultado = await pool.query(
        `SELECT * FROM usuario
         WHERE correo = $1`,
        [correo]
    );
    return resultado.rows[0];
};

// Crear usuario
const crear = async (nombre, apellido, correo, contrasena, rol) => {
    const resultado = await pool.query(
        `INSERT INTO usuario (nombre, apellido, correo, contrasena, rol)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id_usuario, nombre, apellido, correo, rol, estado, fecha_creacion`,
        [nombre, apellido, correo, contrasena, rol]
    );
    return resultado.rows[0];
};

// Modificar usuario
const actualizar = async (id, nombre, apellido, correo, rol) => {
    const resultado = await pool.query(
        `UPDATE usuario
         SET nombre = $1, apellido = $2, correo = $3, rol = $4
         WHERE id_usuario = $5
         RETURNING id_usuario, nombre, apellido, correo, rol, estado, fecha_creacion`,
        [nombre, apellido, correo, rol, id]
    );
    return resultado.rows[0];
};

// Cambiar contraseña
const actualizarContrasena = async (id, contrasena) => {
    const resultado = await pool.query(
        `UPDATE usuario
         SET contrasena = $1
         WHERE id_usuario = $2
         RETURNING id_usuario`,
        [contrasena, id]
    );
    return resultado.rows[0];
};

// Desactivar usuario
const desactivar = async (id) => {
    const resultado = await pool.query(
        `UPDATE usuario
         SET estado = FALSE
         WHERE id_usuario = $1
         RETURNING id_usuario, nombre, apellido, correo, rol, estado, fecha_creacion`,
        [id]
    );
    return resultado.rows[0];
};

// Activar usuario
const activar = async (id) => {
    const resultado = await pool.query(
        `UPDATE usuario
         SET estado = TRUE
         WHERE id_usuario = $1
         RETURNING id_usuario, nombre, apellido, correo, rol, estado, fecha_creacion`,
        [id]
    );
    return resultado.rows[0];
};

// Eliminar usuario
const eliminar = async (id) => {
    const resultado = await pool.query(
        `DELETE FROM usuario
         WHERE id_usuario = $1
         RETURNING id_usuario, nombre, apellido, correo, rol`,
        [id]
    );
    return resultado.rows[0];
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    obtenerPorCorreo,
    crear,
    actualizar,
    actualizarContrasena,
    desactivar,
    activar,
    eliminar
};
