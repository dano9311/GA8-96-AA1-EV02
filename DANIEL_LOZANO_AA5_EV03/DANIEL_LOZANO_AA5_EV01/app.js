// app.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Middleware para manejar JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Importar rutas
const authRoutes = require('./routes/authRoutes');              // Rutas para autenticación
const usuariosRoutes = require('./routes/usuariosRoutes');      // Rutas para usuarios (incluye ActivaUsuario)
const areaTrabajoRoutes = require('./routes/areaTrabajoRoutes'); // Rutas para área de trabajo
const calidadRoutes = require('./routes/calidadRoutes');        // Rutas para calidad
const inventarioRoutes = require('./routes/inventarioRoutes');  // Rutas para inventario

// Usar rutas
app.use('/auth', authRoutes);                       // Prefijo '/auth' para autenticación
app.use('/api/usuarios', usuariosRoutes);               // Prefijo '/usuarios' para todas las operaciones de usuario
app.use('/api/trabajos_area', areaTrabajoRoutes);   // Ruta para trabajos del área
app.use('/api/calidad', calidadRoutes);             // Ruta para calidad
app.use('/api/inventario', inventarioRoutes);       // Ruta para inventario

// Middleware para servir archivos estáticos de React en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  // Ruta para manejar cualquier solicitud que no coincida con una ruta de la API
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
