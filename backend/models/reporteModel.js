
const pool = require('../config/database');

// Consultar todos los reportes
const obtenerTodos = async () => {
    const resultado = await pool.query(
        `SELECT
            r.id_reporte,
            r.id_usuario,
            u.nombre || ' ' || u.apellido AS usuario,
            r.id_categoria,
            c.nombre AS categoria,
            r.id_ubicacion,
            ub.nombre AS ubicacion,
            r.id_evento,
            e.nombre AS evento,
            r.tipo,
            r.nombre_objeto,
            r.descripcion,
            r.caracteristicas,
            r.color,
            r.fecha_ocurrencia,
            r.fecha_reporte,
            r.estado
         FROM reporte r
         INNER JOIN usuario u ON r.id_usuario = u.id_usuario
         INNER JOIN categoria c ON r.id_categoria = c.id_categoria
         INNER JOIN ubicacion ub ON r.id_ubicacion = ub.id_ubicacion
         LEFT JOIN evento e ON r.id_evento = e.id_evento
         ORDER BY r.id_reporte DESC`
    );

    return resultado.rows;
};

// Consultar un reporte por ID
const obtenerPorId = async (id) => {
    const resultado = await pool.query(
        `SELECT *
         FROM reporte
         WHERE id_reporte = $1`,
        [id]
    );

    return resultado.rows[0];
};

// Consultar reportes de un usuario
const obtenerPorUsuario = async (idUsuario) => {
    const resultado = await pool.query(
        `SELECT *
         FROM reporte
         WHERE id_usuario = $1
         ORDER BY id_reporte DESC`,
        [idUsuario]
    );

    return resultado.rows;
};

// Crear reporte
const crear = async (datos) => {
    const {
        id_usuario,
        id_categoria,
        id_ubicacion,
        id_evento,
        tipo,
        nombre_objeto,
        descripcion,
        caracteristicas,
        color,
        fecha_ocurrencia
    } = datos;

    const resultado = await pool.query(
        `INSERT INTO reporte (
            id_usuario,
            id_categoria,
            id_ubicacion,
            id_evento,
            tipo,
            nombre_objeto,
            descripcion,
            caracteristicas,
            color,
            fecha_ocurrencia
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
        [
            id_usuario,
            id_categoria,
            id_ubicacion,
            id_evento || null,
            tipo,
            nombre_objeto,
            descripcion,
            caracteristicas || null,
            color || null,
            fecha_ocurrencia
        ]
    );

    return resultado.rows[0];
};

// Actualizar reporte
const actualizar = async (id, datos) => {
    const {
        id_categoria,
        id_ubicacion,
        id_evento,
        tipo,
        nombre_objeto,
        descripcion,
        caracteristicas,
        color,
        fecha_ocurrencia
    } = datos;

    const resultado = await pool.query(
        `UPDATE reporte
         SET
            id_categoria = $1,
            id_ubicacion = $2,
            id_evento = $3,
            tipo = $4,
            nombre_objeto = $5,
            descripcion = $6,
            caracteristicas = $7,
            color = $8,
            fecha_ocurrencia = $9
         WHERE id_reporte = $10
         RETURNING *`,
        [
            id_categoria,
            id_ubicacion,
            id_evento || null,
            tipo,
            nombre_objeto,
            descripcion,
            caracteristicas || null,
            color || null,
            fecha_ocurrencia,
            id
        ]
    );

    return resultado.rows[0];
};

// Cambiar estado del reporte
const cambiarEstado = async (id, estado) => {
    const resultado = await pool.query(
        `UPDATE reporte
         SET estado = $1
         WHERE id_reporte = $2
         RETURNING *`,
        [estado, id]
    );

    return resultado.rows[0];
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    obtenerPorUsuario,
    crear,
    actualizar,
    cambiarEstado
};
