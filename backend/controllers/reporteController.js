
const reporteModel = require('../models/reporteModel');

// Consultar todos los reportes
const obtenerTodos = async (req, res) => {
    try {
        const reportes = await reporteModel.obtenerTodos();

        res.json(reportes);

    } catch (error) {
        console.error('Error al consultar reportes:', error.message);

        res.status(500).json({
            mensaje: 'Error al consultar los reportes'
        });
    }
};

// Consultar un reporte por ID
const obtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const reporte = await reporteModel.obtenerPorId(id);

        if (!reporte) {
            return res.status(404).json({
                mensaje: 'Reporte no encontrado'
            });
        }

        res.json(reporte);

    } catch (error) {
        console.error('Error al consultar reporte:', error.message);

        res.status(500).json({
            mensaje: 'Error al consultar el reporte'
        });
    }
};

// Consultar reportes del usuario autenticado
const obtenerMisReportes = async (req, res) => {
    try {
        const idUsuario = req.usuario.id_usuario;

        const reportes = await reporteModel.obtenerPorUsuario(idUsuario);

        res.json(reportes);

    } catch (error) {
        console.error('Error al consultar mis reportes:', error.message);

        res.status(500).json({
            mensaje: 'Error al consultar sus reportes'
        });
    }
};

// Crear reporte
const crear = async (req, res) => {
    try {
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
        } = req.body;

        // Validar campos obligatorios
        if (
            !id_categoria ||
            !id_ubicacion ||
            !tipo ||
            !nombre_objeto ||
            !descripcion ||
            !fecha_ocurrencia
        ) {
            return res.status(400).json({
                mensaje: 'Complete todos los campos obligatorios'
            });
        }

        // Validar tipo de reporte
        if (!['PERDIDO', 'ENCONTRADO'].includes(tipo)) {
            return res.status(400).json({
                mensaje: 'El tipo debe ser PERDIDO o ENCONTRADO'
            });
        }

        // Validar fecha
        if (
            !/^\d{4}-\d{2}-\d{2}$/.test(fecha_ocurrencia) ||
            Number.isNaN(Date.parse(fecha_ocurrencia)) ||
            new Date(`${fecha_ocurrencia}T00:00:00.000Z`).toISOString().slice(0, 10) !== fecha_ocurrencia
        ) {
            return res.status(400).json({
                mensaje: 'Ingrese una fecha válida en formato YYYY-MM-DD'
            });
        }

        // Validar nombre del objeto
        if (nombre_objeto.trim().length > 150) {
            return res.status(400).json({
                mensaje: 'El nombre del objeto no puede superar 150 caracteres'
            });
        }

        // Validar descripción
        if (descripcion.trim().length === 0) {
            return res.status(400).json({
                mensaje: 'La descripción no puede estar vacía'
            });
        }

        // El usuario se obtiene del token, no del Body
        const datos = {
            ...req.body,
            id_usuario: req.usuario.id_usuario,
            nombre_objeto: nombre_objeto.trim(),
            descripcion: descripcion.trim()
        };

        const nuevoReporte = await reporteModel.crear(datos);

        res.status(201).json({
            mensaje: 'Reporte creado correctamente',
            reporte: nuevoReporte
        });

    } catch (error) {
        console.error('Error al crear reporte:', error.message);

        if (error.code === '23503') {
            return res.status(400).json({
                mensaje: 'La categoría, ubicación o evento seleccionado no existe'
            });
        }

        res.status(500).json({
            mensaje: 'Error al crear el reporte'
        });
    }
};

// Actualizar reporte
const actualizar = async (req, res) => {
    try {
        const { id } = req.params;

        const reporte = await reporteModel.obtenerPorId(id);

        if (!reporte) {
            return res.status(404).json({
                mensaje: 'Reporte no encontrado'
            });
        }

        if (
            reporte.id_usuario !== req.usuario.id_usuario &&
            req.usuario.rol !== 'ADMIN'
        ) {
            return res.status(403).json({
                mensaje: 'No tiene permisos para modificar este reporte'
            });
        }

        if (
            reporte.estado === 'RECUPERADO' ||
            reporte.estado === 'CERRADO'
        ) {
            return res.status(400).json({
                mensaje: 'No se puede modificar un reporte recuperado o cerrado'
            });
        }

        const {
            id_categoria,
            id_ubicacion,
            id_evento,
            tipo,
            nombre_objeto,
            descripcion,
            fecha_ocurrencia
        } = req.body;

        if (
            !id_categoria ||
            !id_ubicacion ||
            !tipo ||
            !nombre_objeto ||
            !descripcion ||
            !fecha_ocurrencia
        ) {
            return res.status(400).json({
                mensaje: 'Complete todos los campos obligatorios'
            });
        }

        if (!['PERDIDO', 'ENCONTRADO'].includes(tipo)) {
            return res.status(400).json({
                mensaje: 'El tipo debe ser PERDIDO o ENCONTRADO'
            });
        }

        const reporteActualizado = await reporteModel.actualizar(id, req.body);

        res.json({
            mensaje: 'Reporte actualizado correctamente',
            reporte: reporteActualizado
        });

    } catch (error) {
        console.error('Error al actualizar reporte:', error.message);

        if (error.code === '23503') {
            return res.status(400).json({
                mensaje: 'La categoría, ubicación o evento seleccionado no existe'
            });
        }

        res.status(500).json({
            mensaje: 'Error al actualizar el reporte'
        });
    }
};

// Cambiar estado del reporte (solo administrador)
const cambiarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const estadosPermitidos = [
            'PUBLICADO',
            'EN_REVISION',
            'RECUPERADO',
            'CERRADO'
        ];

        if (!estadosPermitidos.includes(estado)) {
            return res.status(400).json({
                mensaje: 'Estado no válido'
            });
        }

        const reporte = await reporteModel.cambiarEstado(id, estado);

        if (!reporte) {
            return res.status(404).json({
                mensaje: 'Reporte no encontrado'
            });
        }

        res.json({
            mensaje: 'Estado actualizado correctamente',
            reporte
        });

    } catch (error) {
        console.error('Error al cambiar estado:', error.message);

        res.status(500).json({
            mensaje: 'Error al cambiar el estado'
        });
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    obtenerMisReportes,
    crear,
    actualizar,
    cambiarEstado
};
