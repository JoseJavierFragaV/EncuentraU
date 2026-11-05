
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import './Categorias.css';

function Categorias({ token }) {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [idEditar, setIdEditar] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const cargarCategorias = async () => {
        try {
            const datos = await apiRequest('/categorias');
            setCategorias(datos);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    const guardarCategoria = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');
        setCargando(true);

        try {
            const datos = { nombre, descripcion };

            if (idEditar) {
                await apiRequest(`/categorias/${idEditar}`, {
                    method: 'PUT',
                    body: JSON.stringify(datos)
                }, token);

                setMensaje('Categoría actualizada correctamente.');
            } else {
                await apiRequest('/categorias', {
                    method: 'POST',
                    body: JSON.stringify(datos)
                }, token);

                setMensaje('Categoría creada correctamente.');
            }

            limpiarFormulario();
            await cargarCategorias();

        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    const prepararEdicion = (categoria) => {
        setIdEditar(categoria.id_categoria);
        setNombre(categoria.nombre);
        setDescripcion(categoria.descripcion || '');
        setMensaje('');
        setError('');
    };

    const limpiarFormulario = () => {
        setIdEditar(null);
        setNombre('');
        setDescripcion('');
    };

    const desactivarCategoria = async (id) => {
        const confirmar = window.confirm(
            '¿Estás seguro de desactivar esta categoría?'
        );

        if (!confirmar) return;

        setMensaje('');
        setError('');

        try {
            await apiRequest(`/categorias/${id}/desactivar`, {
                method: 'PATCH'
            }, token);

            setMensaje('Categoría desactivada correctamente.');
            await cargarCategorias();

        } catch (error) {
            setError(error.message);
        }
    };

    const activarCategoria = async (id) => {
        const confirmar = window.confirm(
            '¿Estás seguro de activar esta categoría?'
        );

        if (!confirmar) return;

        setMensaje('');
        setError('');

        try {
            await apiRequest(`/categorias/${id}/activar`, {
                method: 'PATCH'
            }, token);

            setMensaje('Categoría activada correctamente.');
            await cargarCategorias();

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="categorias-container">

            <div className="categorias-titulo">
                <div>
                    <h2>Gestión de categorías</h2>
                    <p>Administra las categorías de objetos del sistema.</p>
                </div>

                <span>{categorias.length} registros</span>
            </div>

            <div className="categoria-formulario">
                <h3>{idEditar ? 'Editar categoría' : 'Nueva categoría'}</h3>

                <form onSubmit={guardarCategoria}>
                    <div className="categoria-campos">
                        <div>
                            <label>Nombre</label>
                            <input
                                type="text"
                                placeholder="Nombre de la categoría"
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
                                placeholder="Descripción de la categoría"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="categoria-botones">
                        <button type="submit" disabled={cargando}>
                            {cargando ? 'Guardando...' :
                                idEditar ? 'Actualizar categoría' : 'Guardar categoría'}
                        </button>

                        {idEditar && (
                            <button
                                type="button"
                                className="btn-cancelar"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {mensaje && <div className="categoria-mensaje">{mensaje}</div>}
            {error && <div className="categoria-error">{error}</div>}

            <div className="categoria-tabla">
                <h3>Listado de categorías</h3>

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
                            {categorias.map((categoria) => (
                                <tr key={categoria.id_categoria}>
                                    <td>{categoria.id_categoria}</td>
                                    <td>{categoria.nombre}</td>
                                    <td>{categoria.descripcion || 'Sin descripción'}</td>
                                    <td>
                                        <span className={
                                            categoria.estado
                                                ? 'estado-activo'
                                                : 'estado-inactivo'
                                        }>
                                            {categoria.estado ? 'Activa' : 'Inactiva'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="acciones-categoria">
                                            <button
                                                className="btn-editar"
                                                onClick={() => prepararEdicion(categoria)}
                                            >
                                                Editar
                                            </button>

                                            {categoria.estado ? (
                                                <button
                                                    className="btn-desactivar"
                                                    onClick={() => desactivarCategoria(
                                                        categoria.id_categoria
                                                    )}
                                                >
                                                    Desactivar
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn-activar"
                                                    onClick={() => activarCategoria(
                                                        categoria.id_categoria
                                                    )}
                                                >
                                                    Activar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {categorias.length === 0 && (
                                <tr>
                                    <td colSpan="5">No hay categorías registradas.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Categorias;
