
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import './Ubicaciones.css';

function Ubicaciones({ token }) {
    const [ubicaciones, setUbicaciones] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idEditar, setIdEditar] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    // Consultar ubicaciones
    const cargarUbicaciones = async () => {
        try {
            const datos = await apiRequest('/ubicaciones');
            setUbicaciones(datos);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        cargarUbicaciones();
    }, []);

    // Guardar o actualizar ubicación
    const guardarUbicacion = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');
        setCargando(true);

        try {
            const datos = { nombre, descripcion };

            if (idEditar) {
                await apiRequest(`/ubicaciones/${idEditar}`, {
                    method: 'PUT',
                    body: JSON.stringify(datos)
                }, token);

                setMensaje('Ubicación actualizada correctamente.');
            } else {
                await apiRequest('/ubicaciones', {
                    method: 'POST',
                    body: JSON.stringify(datos)
                }, token);

                setMensaje('Ubicación creada correctamente.');
            }

            limpiarFormulario();
            await cargarUbicaciones();

        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    // Preparar edición
    const prepararEdicion = (ubicacion) => {
        setIdEditar(ubicacion.id_ubicacion);
        setNombre(ubicacion.nombre);
        setDescripcion(ubicacion.descripcion || '');
        setMensaje('');
        setError('');
    };

    // Limpiar formulario
    const limpiarFormulario = () => {
        setIdEditar(null);
        setNombre('');
        setDescripcion('');
    };

    // Desactivar ubicación
    const desactivarUbicacion = async (id) => {
        const confirmar = window.confirm(
            '¿Estás seguro de desactivar esta ubicación?'
        );

        if (!confirmar) return;

        setMensaje('');
        setError('');

        try {
            await apiRequest(`/ubicaciones/${id}/desactivar`, {
                method: 'PATCH'
            }, token);

            setMensaje('Ubicación desactivada correctamente.');
            await cargarUbicaciones();

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="ubicaciones-container">

            <div className="ubicaciones-titulo">
                <div>
                    <h2>Gestión de ubicaciones</h2>
                    <p>Administra los lugares de la universidad.</p>
                </div>

                <span>{ubicaciones.length} registros</span>
            </div>

            <div className="ubicacion-formulario">
                <h3>{idEditar ? 'Editar ubicación' : 'Nueva ubicación'}</h3>

                <form onSubmit={guardarUbicacion}>
                    <div className="ubicacion-campos">

                        <div>
                            <label>Nombre</label>
                            <input
                                type="text"
                                placeholder="Nombre de la ubicación"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                maxLength="100"
                                required
                            />
                        </div>

                        <div>
                            <label>Descripción</label>
                            <input
                                type="text"
                                placeholder="Descripción de la ubicación"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="ubicacion-botones">
                        <button type="submit" disabled={cargando}>
                            {cargando ? 'Guardando...' :
                                idEditar ? 'Actualizar ubicación' : 'Guardar ubicación'}
                        </button>

                        {idEditar && (
                            <button
                                type="button"
                                className="btn-cancelar-ubicacion"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {mensaje && (
                <div className="ubicacion-mensaje">{mensaje}</div>
            )}

            {error && (
                <div className="ubicacion-error">{error}</div>
            )}

            <div className="ubicacion-tabla">
                <h3>Listado de ubicaciones</h3>

                <div className="tabla-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ubicaciones.map((ubicacion) => (
                                <tr key={ubicacion.id_ubicacion}>
                                    <td>{ubicacion.id_ubicacion}</td>
                                    <td>{corregirTexto(ubicacion.nombre)}</td>
                                    <td>
                                        {corregirTexto(ubicacion.descripcion || 'Sin descripción')}
                                    </td>

                                    <td>
                                        <span className={
                                            ubicacion.estado
                                                ? 'ubicacion-activa'
                                                : 'ubicacion-inactiva'
                                        }>
                                            {ubicacion.estado ? 'Activa' : 'Inactiva'}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="acciones-ubicacion">

                                            <button
                                                className="btn-editar-ubicacion"
                                                onClick={() => prepararEdicion(ubicacion)}
                                            >
                                                Editar
                                            </button>

                                            {ubicacion.estado && (
                                                <button
                                                    className="btn-desactivar-ubicacion"
                                                    onClick={() => desactivarUbicacion(
                                                        ubicacion.id_ubicacion
                                                    )}
                                                >
                                                    Desactivar
                                                </button>
                                            )}

                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {ubicaciones.length === 0 && (
                                <tr>
                                    <td colSpan="5">
                                        No hay ubicaciones registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Ubicaciones;


const corregirTexto = (texto) => {
    if (!texto) return '';

    return texto
        .replaceAll('µ', 'Á')
        .replaceAll('¢', 'ó')
        .replaceAll('¡', 'í')
        .replaceAll('¤', 'ñ')
        .replaceAll('±', 'Ñ');
};