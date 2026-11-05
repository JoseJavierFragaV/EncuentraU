const pool = require('../config/database');

// Consultar todas las ubicaciones
const obtenerTodas = async () => {
    const resultado = await pool.query(
        'SELECT * FROM ubicacion ORDER BY id_ubicacion'
    );
    return resultado.rows;
};

// Crear ubicación
const crear = async (nombre, descripcion) => {
    const resultado = await pool.query(
        `INSERT INTO ubicacion (nombre, descripcion)
         VALUES ($1, $2)
         RETURNING *`,
        [nombre, descripcion]
    );
    return resultado.rows[0];
};

// Modificar ubicación
const actualizar = async (id, nombre, descripcion) => {
    const resultado = await pool.query(
        `UPDATE ubicacion
         SET nombre = $1, descripcion = $2
         WHERE id_ubicacion = $3
         RETURNING *`,
        [nombre, descripcion, id]
    );
    return resultado.rows[0];
};

// Desactivar ubicación
const desactivar = async (id) => {
    const resultado = await pool.query(
        `UPDATE ubicacion
         SET estado = FALSE
         WHERE id_ubicacion = $1
         RETURNING *`,
        [id]
    );
    return resultado.rows[0];
};

module.exports = {
    obtenerTodas,
    crear,
    actualizar,
    desactivar
};