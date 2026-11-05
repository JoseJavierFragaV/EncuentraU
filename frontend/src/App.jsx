
import { useState } from 'react';
import Login from './pages/Login';
import Categorias from './pages/Categorias';
import Ubicaciones from './pages/Ubicaciones';
import Eventos from './pages/Eventos';
import Usuarios from './pages/Usuarios';
import Reportes from './pages/Reportes';
import './App.css';

function App() {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem('usuario')) || null
    );

    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );

    const [seccion, setSeccion] = useState('Inicio');

    const manejarLogin = (nuevoToken, datosUsuario) => {
        localStorage.setItem('token', nuevoToken);
        localStorage.setItem('usuario', JSON.stringify(datosUsuario));
        setToken(nuevoToken);
        setUsuario(datosUsuario);
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setToken(null);
        setUsuario(null);
    };

    const opciones = [
        'Inicio',
        'Categorías',
        'Ubicaciones',
        'Eventos',
        'Usuarios',
        'Reportes'
    ];

    if (!token || !usuario) {
        return <Login onLogin={manejarLogin} />;
    }

    if (usuario.rol !== 'ADMIN') {
        return (
            <div className="acceso-denegado">
                <h2>Acceso restringido</h2>
                <p>No tienes permisos para acceder al panel.</p>
                <button onClick={cerrarSesion}>Cerrar sesión</button>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <h2>EncuentraU</h2>
                    <span>Administración MVC</span>
                </div>

                <nav>
                    {opciones.map((opcion) => (
                        <button
                            key={opcion}
                            className={seccion === opcion ? 'menu-activo' : ''}
                            onClick={() => setSeccion(opcion)}
                        >
                            {opcion === 'Inicio' ? '⌂' : '●'}
                            <span>{opcion}</span>
                        </button>
                    ))}
                </nav>

                <button className="btn-salir" onClick={cerrarSesion}>
                    Cerrar sesión
                </button>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h2>{seccion}</h2>
                        <p>Panel de administración de EncuentraU</p>
                    </div>

                    <div className="admin-user">
                        <div className="user-avatar">
                            {usuario.nombre.charAt(0)}
                        </div>
                        <div>
                            <strong>
                                {usuario.nombre} {usuario.apellido}
                            </strong>
                            <span>Administrador</span>
                        </div>
                    </div>
                </header>

                <section className="admin-content">
                    {seccion === 'Inicio' ? (
                        <>
                            <h2>¡Bienvenido a EncuentraU!</h2>
                            <p>
                                Administra la información del sistema desde
                                este panel.
                            </p>

                            <div className="dashboard-grid">
                                {opciones.slice(1).map((opcion) => (
                                    <button
                                        className="dashboard-card"
                                        key={opcion}
                                        onClick={() => setSeccion(opcion)}
                                    >
                                        <h3>{opcion}</h3>
                                        <span>Administrar información →</span>
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : seccion === 'Categorías' ? (
                        <Categorias token={token} />
                    ) : seccion === 'Ubicaciones' ? (
                        <Ubicaciones token={token} />
                    ) : seccion === 'Eventos' ? (
                        <Eventos token={token} />
                    ) : seccion === 'Usuarios' ? (
                        <Usuarios token={token} />
                    ) : seccion === 'Reportes' ? (
                        <Reportes token={token} />
                    ) : null}
                </section>
            </main>
        </div>
    );
}

export default App;
