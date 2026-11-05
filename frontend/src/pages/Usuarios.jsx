
import { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import './Usuarios.css';

function Usuarios({ token }) {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('USUARIO');
    const [idEditar, setIdEditar] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const cargarUsuarios = async () => {
        try {
            const datos = await apiRequest('/usuarios', {}, token);
            setUsuarios(datos);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const limpiarFormulario = () => {
        setIdEditar(null);
        setNombre('');
        setApellido('');
        setCorreo('');
        setContrasena('');
        setRol('USUARIO');
    };

    const guardarUsuario = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');
        setCargando(true);

        try {
            const datos = { nombre, apellido, correo, rol };

            if (idEditar) {
                await apiRequest(
                    `/usuarios/${idEditar}`,
                    { method: 'PUT', body: JSON.stringify(datos) },
                    token
                );
                setMensaje('Usuario actualizado correctamente.');
            } else {
                datos.contrasena = contrasena;

                await apiRequest(
                    '/usuarios',
                    { method: 'POST', body: JSON.stringify(datos) },
                    token
                );
                setMensaje('Usuario creado correctamente.');
            }

            limpiarFormulario();
            await cargarUsuarios();
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    const prepararEdicion = (usuario) => {
        setIdEditar(usuario.id_usuario);
        setNombre(usuario.nombre);
        setApellido(usuario.apellido);
        setCorreo(usuario.correo);
        setRol(usuario.rol);
        setContrasena('');
        setMensaje('');
        setError('');
    };

    const cambiarEstado = async (id, activo) => {
        const accion = activo ? 'desactivar' : 'activar';

        if (!window.confirm(`¿Deseas ${accion} este usuario?`)) return;

        setMensaje('');
        setError('');

        try {
            await apiRequest(
                `/usuarios/${id}/${accion}`,
                { method: 'PATCH' },
                token
            );

            setMensaje(`Usuario ${activo ? 'desactivado' : 'activado'} correctamente.`);
            await cargarUsuarios();
        } catch (error) {
            setError(error.message);
        }
    };

    const eliminarUsuario = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.')) {
            return;
        }

        setMensaje('');
        setError('');

        try {
            await apiRequest(
                `/usuarios/${id}`,
                { method: 'DELETE' },
                token
            );

            setMensaje('Usuario eliminado correctamente.');
            await cargarUsuarios();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="usuarios-container">
            <div className="usuarios-titulo">
                <div>
                    <h2>Gestión de usuarios</h2>
                    <p>Administra las cuentas de EncuentraU.</p>
                </div>
                <span>{usuarios.length} registros</span>
            </div>

            <div className="usuario-formulario">
                <h3>{idEditar ? 'Editar usuario' : 'Nuevo usuario'}</h3>

                <form onSubmit={guardarUsuario}>
                    <div className="usuario-campos">
                        <div>
                            <label>Nombre</label>
                            <input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Nombre"
                                required
                            />
                        </div>

                        <div>
                            <label>Apellido</label>
                            <input
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                placeholder="Apellido"
                                required
                            />
                        </div>

                        <div>
                            <label>Correo electrónico</label>
                            <input
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </div>

                        <div>
                            <label>Rol</label>
                            <select value={rol} onChange={(e) => setRol(e.target.value)}>
                                <option value="USUARIO">Usuario</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </div>

                        {!idEditar && (
                            <div>
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    placeholder="Mínimo 8 caracteres"
                                    minLength="8"
                                    required
                                />
                            </div>
                        )}
                    </div>

                    <div className="usuario-botones">
                        <button type="submit" disabled={cargando}>
                            {cargando ? 'Guardando...' : idEditar ? 'Actualizar usuario' : 'Guardar usuario'}
                        </button>

                        {idEditar && (
                            <button
                                type="button"
                                className="btn-cancelar-usuario"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {mensaje && <div className="usuario-mensaje">{mensaje}</div>}
            {error && <div className="usuario-error">{error}</div>}

            <div className="usuario-tabla">
                <h3>Listado de usuarios</h3>

                <div className="tabla-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id_usuario}>
                                    <td>{usuario.id_usuario}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellido}</td>
                                    <td>{usuario.correo}</td>
                                    <td>{usuario.rol}</td>
                                    <td>
                                        <span className={usuario.estado ? 'usuario-activo' : 'usuario-inactivo'}>
                                            {usuario.estado ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="acciones-usuario">
                                            <button
                                                className="btn-editar-usuario"
                                                onClick={() => prepararEdicion(usuario)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className={usuario.estado ? 'btn-desactivar-usuario' : 'btn-activar-usuario'}
                                                onClick={() => cambiarEstado(usuario.id_usuario, usuario.estado)}
                                            >
                                                {usuario.estado ? 'Desactivar' : 'Activar'}
                                            </button>

                                            <button
                                                className="btn-eliminar-usuario"
                                                onClick={() => eliminarUsuario(usuario.id_usuario)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {usuarios.length === 0 && (
                                <tr>
                                    <td colSpan="7">No hay usuarios registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Usuarios;
