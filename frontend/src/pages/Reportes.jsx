
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import './Reportes.css';

function Reportes({ token }) {
    const [reportes, setReportes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [eventos, setEventos] = useState([]);

    const [idEditar, setIdEditar] = useState(null);
    const [idCategoria, setIdCategoria] = useState('');
    const [idUbicacion, setIdUbicacion] = useState('');
    const [idEvento, setIdEvento] = useState('');
    const [tipo, setTipo] = useState('PERDIDO');
    const [nombreObjeto, setNombreObjeto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [caracteristicas, setCaracteristicas] = useState('');
    const [color, setColor] = useState('');
    const [fechaOcurrencia, setFechaOcurrencia] = useState('');

    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const cargarDatos = async () => {
        try {
            const [datosReportes, datosCategorias, datosUbicaciones, datosEventos] =
                await Promise.all([
                    apiRequest('/reportes'),
                    apiRequest('/categorias'),
                    apiRequest('/ubicaciones'),
                    apiRequest('/eventos')
                ]);

            setReportes(datosReportes);
            setCategorias(datosCategorias.filter(item => item.estado));
            setUbicaciones(datosUbicaciones.filter(item => item.estado));
            setEventos(datosEventos.filter(item => item.estado));
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const limpiarFormulario = () => {
        setIdEditar(null);
        setIdCategoria('');
        setIdUbicacion('');
        setIdEvento('');
        setTipo('PERDIDO');
        setNombreObjeto('');
        setDescripcion('');
        setCaracteristicas('');
        setColor('');
        setFechaOcurrencia('');
    };

    const guardarReporte = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');
        setCargando(true);

        try {
            const datos = {
                id_categoria: Number(idCategoria),
                id_ubicacion: Number(idUbicacion),
                id_evento: idEvento ? Number(idEvento) : null,
                tipo,
                nombre_objeto: nombreObjeto,
                descripcion,
                caracteristicas,
                color,
                fecha_ocurrencia: fechaOcurrencia
            };

            if (idEditar) {
                await apiRequest(
                    `/reportes/${idEditar}`,
                    {
                        method: 'PUT',
                        body: JSON.stringify(datos)
                    },
                    token
                );
                setMensaje('Reporte actualizado correctamente.');
            } else {
                await apiRequest(
                    '/reportes',
                    {
                        method: 'POST',
                        body: JSON.stringify(datos)
                    },
                    token
                );
                setMensaje('Reporte creado correctamente.');
            }

            limpiarFormulario();
            await cargarDatos();
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    const prepararEdicion = async (reporte) => {
        try {
            const datos = await apiRequest(
                `/reportes/${reporte.id_reporte}`
            );

            if (
                datos.estado === 'RECUPERADO' ||
                datos.estado === 'CERRADO'
            ) {
                setError('No se puede editar un reporte recuperado o cerrado.');
                return;
            }

            setIdEditar(datos.id_reporte);
            setIdCategoria(String(datos.id_categoria));
            setIdUbicacion(String(datos.id_ubicacion));
            setIdEvento(datos.id_evento ? String(datos.id_evento) : '');
            setTipo(datos.tipo);
            setNombreObjeto(datos.nombre_objeto);
            setDescripcion(datos.descripcion);
            setCaracteristicas(datos.caracteristicas || '');
            setColor(datos.color || '');
            setFechaOcurrencia(
                datos.fecha_ocurrencia?.substring(0, 10) || ''
            );

            setMensaje('');
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    const cambiarEstado = async (id, estado) => {
        if (!window.confirm(`¿Deseas cambiar el estado a ${estado.replace('_', ' ')}?`)) {
            return;
        }

        setMensaje('');
        setError('');

        try {
            await apiRequest(
                `/reportes/${id}/estado`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({ estado })
                },
                token
            );

            setMensaje('Estado del reporte actualizado correctamente.');
            await cargarDatos();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="reportes-container">
            <div className="reportes-titulo">
                <div>
                    <h2>Gestión de reportes</h2>
                    <p>Administra los objetos perdidos y encontrados.</p>
                </div>
                <span>{reportes.length} registros</span>
            </div>

            <div className="reporte-formulario">
                <h3>{idEditar ? 'Editar reporte' : 'Registrar reporte'}</h3>

                <form onSubmit={guardarReporte}>
                    <div className="reporte-campos">
                        <div>
                            <label>Tipo de reporte</label>
                            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                <option value="PERDIDO">Objeto perdido</option>
                                <option value="ENCONTRADO">Objeto encontrado</option>
                            </select>
                        </div>

                        <div>
                            <label>Nombre del objeto</label>
                            <input
                                value={nombreObjeto}
                                onChange={(e) => setNombreObjeto(e.target.value)}
                                maxLength="150"
                                required
                                placeholder="Ej. Mochila negra"
                            />
                        </div>

                        <div>
                            <label>Categoría</label>
                            <select
                                value={idCategoria}
                                onChange={(e) => setIdCategoria(e.target.value)}
                                required
                            >
                                <option value="">Seleccionar categoría</option>
                                {categorias.map(item => (
                                    <option key={item.id_categoria} value={item.id_categoria}>
                                        {corregirTexto(item.nombre)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Ubicación</label>
                            <select
                                value={idUbicacion}
                                onChange={(e) => setIdUbicacion(e.target.value)}
                                required
                            >
                                <option value="">Seleccionar ubicación</option>
                                {ubicaciones.map(item => (
                                    <option key={item.id_ubicacion} value={item.id_ubicacion}>
                                        {corregirTexto(item.nombre)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Evento (opcional)</label>
                            <select value={idEvento} onChange={(e) => setIdEvento(e.target.value)}>
                                <option value="">Sin evento</option>
                                {eventos.map(item => (
                                    <option key={item.id_evento} value={item.id_evento}>
                                        {item.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Fecha de ocurrencia</label>
                            <input
                                type="date"
                                value={fechaOcurrencia}
                                onChange={(e) => setFechaOcurrencia(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>Color</label>
                            <input
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                placeholder="Ej. Negro"
                            />
                        </div>

                        <div>
                            <label>Características</label>
                            <input
                                value={caracteristicas}
                                onChange={(e) => setCaracteristicas(e.target.value)}
                                placeholder="Características adicionales"
                            />
                        </div>

                        <div className="reporte-descripcion">
                            <label>Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                                placeholder="Describe el objeto..."
                            />
                        </div>
                    </div>

                    <div className="reporte-botones">
                        <button type="submit" disabled={cargando}>
                            {cargando ? 'Guardando...' : idEditar ? 'Actualizar reporte' : 'Guardar reporte'}
                        </button>

                        {idEditar && (
                            <button
                                type="button"
                                className="btn-cancelar-reporte"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {mensaje && <div className="reporte-mensaje">{mensaje}</div>}
            {error && <div className="reporte-error">{error}</div>}

            <div className="reporte-tabla">
                <h3>Listado de reportes</h3>

                <div className="tabla-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Objeto</th>
                                <th>Tipo</th>
                                <th>Usuario</th>
                                <th>Categoría</th>
                                <th>Ubicación</th>
                                <th>Evento</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reportes.map(reporte => (
                                <tr key={reporte.id_reporte}>
                                    <td>{reporte.id_reporte}</td>
                                    <td>{reporte.nombre_objeto}</td>
                                    <td>{reporte.tipo}</td>
                                    <td>{reporte.usuario}</td>
                                    <td>{reporte.categoria}</td>
                                    <td>{corregirTexto(reporte.ubicacion)}</td>
                                    <td>{reporte.evento || 'Sin evento'}</td>
                                    <td>{reporte.fecha_ocurrencia?.substring(0, 10)}</td>
                                    <td>
                                        <span className={`reporte-estado estado-${reporte.estado?.toLowerCase()}`}>
                                            {reporte.estado?.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="acciones-reporte">
                                            <button
                                                className="btn-editar-reporte"
                                                onClick={() => prepararEdicion(reporte)}
                                                disabled={['RECUPERADO', 'CERRADO'].includes(reporte.estado)}
                                            >
                                                Editar
                                            </button>

                                            <select
                                                className="select-estado-reporte"
                                                value={reporte.estado}
                                                onChange={(e) => cambiarEstado(reporte.id_reporte, e.target.value)}
                                            >
                                                <option value="PUBLICADO">Publicado</option>
                                                <option value="EN_REVISION">En revisión</option>
                                                <option value="RECUPERADO">Recuperado</option>
                                                <option value="CERRADO">Cerrado</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {reportes.length === 0 && (
                                <tr>
                                    <td colSpan="10">No hay reportes registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Reportes;

const corregirTexto = (texto) => {
    if (!texto) return '';

    return texto
        .replaceAll('µ', 'Á')
        .replaceAll('¢', 'ó')
        .replaceAll('¡', 'í')
        .replaceAll('¤', 'ñ')
        .replaceAll('±', 'Ñ');
};