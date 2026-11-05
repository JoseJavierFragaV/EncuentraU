
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/database');
const categoriaRoutes = require('./routes/categoriaRoutes');
const ubicacionRoutes = require('./routes/ubicacionRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de EncuentraU funcionando correctamente'
    });
});

// Prueba de conexión con PostgreSQL
app.get('/api/prueba-db', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT NOW()');

        res.json({
            mensaje: 'Conexion con PostgreSQL exitosa',
            fecha: resultado.rows[0].now
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            mensaje: 'Error al conectar con PostgreSQL'
        });
    }
});

app.use('/api/categorias', categoriaRoutes);
app.use('/api/ubicaciones', ubicacionRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reportes', reporteRoutes);

const PORT = process.env.PORT || 3000;

const servidor = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor EncuentraU activo en el puerto ${PORT}`);
});

servidor.on('error', (error) => {
    console.error('Error del servidor:', error.message);
});

servidor.on('close', () => {
    console.log('El servidor se ha cerrado');
});
