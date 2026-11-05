
import { useState } from 'react';
import { apiRequest } from '../services/api';
import './Login.css';

function Login({ onLogin }) {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            const datos = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ correo, contrasena })
            });

            onLogin(datos.token, datos.usuario);

        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo">
                    <h1>EncuentraU</h1>
                    <p>Sistema de objetos perdidos y encontrados</p>
                </div>

                <h2>Iniciar sesión</h2>
                <p className="login-description">
                    Ingresa tus credenciales para continuar.
                </p>

                <form onSubmit={iniciarSesion}>
                    <label>Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="Ingrese su correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />

                    {error && <div className="login-error">{error}</div>}

                    <button type="submit" disabled={cargando}>
                        {cargando ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>

                <p className="login-footer">
                    EncuentraU © 2026
                </p>
            </div>
        </div>
    );
}

export default Login;
