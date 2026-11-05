
const pool = require('../config/database');

// Consultar todos los eventos
const obtenerTodos = async () => {
    const resultado = await pool.query(
        'SELECT * FROM evento ORDER BY id_evento'
    );
    return resultado.rows;
};

// Crear evento
const crear = async (nombre, descripcion, fecha_evento) => {
    const resultado = await pool.query(
        `INSERT INTO evento (nombre, descripcion, fecha_evento)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [nombre, descripcion, fecha_evento]
    );
    return resultado.rows[0];
};

// Modificar evento
const actualizar = async (id, nombre, descripcion, fecha_evento) => {
    const resultado = await pool.query(
        `UPDATE evento
         SET nombre = $1, descripcion = $2, fecha_evento = $3
         WHERE id_evento = $4
         RETURNING *`,
        [nombre, descripcion, fecha_evento, id]
    );
    return resultado.rows[0];
};

// Desactivar evento
const desactivar = async (id) => {
    const resultado = await pool.query(
        `UPDATE evento
         SET estado = FALSE
         WHERE id_evento = $1
         RETURNING *`,
        [id]
    );
    return resultado.rows[0];
};

module.exports = {
    obtenerTodos,
    crear,
    actualizar,
    desactivar
};
