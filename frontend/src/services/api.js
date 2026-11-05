const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Función para realizar peticiones al backend
export const apiRequest = async (endpoint, options = {}, token = null) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const respuesta = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || 'Error al comunicarse con el servidor');
        }

        return datos;

    } catch (error) {
        throw error;
    }
};
