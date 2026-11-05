
const pool = require('../config/database');

// Consultar todas las categorías
const obtenerTodas = async () => {
    const resultado = await pool.query(
        `SELECT *
         FROM categoria
         ORDER BY id_categoria ASC`
    );

    return resultado.rows;
};

// Crear categoría
const crear = async (nombre, descripcion) => {
    const resultado = await pool.query(
        `INSERT INTO categoria (nombre, descripcion)
         VALUES ($1, $2)
         RETURNING *`,
        [nombre, descripcion]
    );

    return resultado.rows[0];
};

// Actualizar categoría
const actualizar = async (id, nombre, descripcion) => {
    const resultado = await pool.query(
        `UPDATE categoria
         SET nombre = $1,
             descripcion = $2
         WHERE id_categoria = $3
         RETURNING *`,
        [nombre, descripcion, id]
    );

    return resultado.rows[0];
};

// Desactivar categoría
const desactivar = async (id) => {
    const resultado = await pool.query(
        `UPDATE categoria
         SET estado = FALSE
         WHERE id_categoria = $1
         RETURNING *`,
        [id]
    );

    return resultado.rows[0];
};

// Activar categoría
const activar = async (id) => {
    const resultado = await pool.query(
        `UPDATE categoria
         SET estado = TRUE
         WHERE id_categoria = $1
         RETURNING *`,
        [id]
    );

    return resultado.rows[0];
};

// Exportar funciones
module.exports = {
    obtenerTodas,
    crear,
    actualizar,
    desactivar,
    activar
};
