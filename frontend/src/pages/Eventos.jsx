
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import './Eventos.css';

function Eventos({ token }) {
    const [eventos, setEventos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [idEditar, setIdEditar] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const cargarEventos = async () => {
        try {
            const datos = await apiRequest('/eventos');
            setEventos(datos);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        cargarEventos();
    }, []);

    const guardarEvento = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');
        setCargando(true);

        try {
            const datos = {
                nombre,
                descripcion,
                fecha
            };

            if (idEditar) {
                await apiRequest(`/eventos/${idEditar}`, {
                    method: 'PUT',
                    body: JSON.stringify(datos)
                }, token);

                setMensaje('Evento actualizado correctamente.');
            } else {
                await apiRequest('/eventos', {
                    method: 'POST',
                    body: JSON.stringify(datos)
                }, token);

                setMensaje('Evento creado correctamente.');
            }

            limpiarFormulario();
            await cargarEventos();

        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    const prepararEdicion = (evento) => {
        setIdEditar(evento.id_evento);
        setNombre(evento.nombre);
        setDescripcion(evento.descripcion || '');
        setFecha(evento.fecha ? evento.fecha.substring(0, 10) : '');
        setMensaje('');
        setError('');
    };

    const limpiarFormulario = () => {
        setIdEditar(null);
        setNombre('');
        setDescripcion('');
        setFecha('');
    };

    const desactivarEvento = async (id) => {
        const confirmar = window.confirm(
            '¿Estás seguro de desactivar este evento?'
        );

        if (!confirmar) return;

        setMensaje('');
        setError('');

        try {
            await apiRequest(`/eventos/${id}/desactivar`, {
                method: 'PATCH'
            }, token);

            setMensaje('Evento desactivado correctamente.');
            await cargarEventos();

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="eventos-container">

            <div className="eventos-titulo">
                <div>
                    <h2>Gestión de eventos</h2>
                    <p>Administra los eventos de la universidad.</p>
                </div>

                <span>{eventos.length} registros</span>
            </div>

            <div className="evento-formulario">
                <h3>{idEditar ? 'Editar evento' : 'Nuevo evento'}</h3>

                <form onSubmit={guardarEvento}>
                    <div className="evento-campos">

                        <div>
                            <label>Nombre del evento</label>
                            <input
                                type="text"
                                placeholder="Nombre del evento"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                maxLength="100"
                                required
                            />
                        </div>

                        <div>
                            <label>Fecha del evento</label>
                            <input
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                        </div>

                        <div className="evento-descripcion">
                            <label>Descripción</label>
                            <textarea
                                placeholder="Descripción del evento"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="evento-botones">
                        <button type="submit" disabled={cargando}>
                            {cargando ? 'Guardando...' :
                                idEditar ? 'Actualizar evento' : 'Guardar evento'}
                        </button>

                        {idEditar && (
                            <button
                                type="button"
                                className="btn-cancelar-evento"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {mensaje && <div className="evento-mensaje">{mensaje}</div>}
            {error && <div className="evento-error">{error}</div>}

            <div className="evento-tabla">
                <h3>Listado de eventos</h3>

                <div className="tabla-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {eventos.map((evento) => (
                                <tr key={evento.id_evento}>
                                    <td>{evento.id_evento}</td>
                                    <td>{evento.nombre}</td>
                                    <td>{evento.descripcion || 'Sin descripción'}</td>
                                    <td>
                                        {evento.fecha
                                            ? evento.fecha.substring(0, 10)
                                            : 'Sin fecha'}
                                    </td>
                                    <td>
                                        <span className={
                                            evento.estado
                                                ? 'evento-activo'
                                                : 'evento-inactivo'
                                        }>
                                            {evento.estado ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="acciones-evento">
                                            <button
                                                className="btn-editar-evento"
                                                onClick={() => prepararEdicion(evento)}
                                            >
                                                Editar
                                            </button>

                                            {evento.estado && (
                                                <button
                                                    className="btn-desactivar-evento"
                                                    onClick={() => desactivarEvento(
                                                        evento.id_evento
                                                    )}
                                                >
                                                    Desactivar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {eventos.length === 0 && (
                                <tr>
                                    <td colSpan="6">
                                        No hay eventos registrados.
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

export default Eventos;
