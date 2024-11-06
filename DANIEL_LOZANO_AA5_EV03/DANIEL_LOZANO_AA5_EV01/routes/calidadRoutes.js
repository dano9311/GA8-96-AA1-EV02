// routes/calidadRoutes.js
const express = require('express');
const router = express.Router();
const calidadController = require('../controllers/calidadController');

// Definición de las rutas para la gestión de calidad
router.get('/', calidadController.getAllInformes);       // Obtener todos los informes de calidad
router.post('/', calidadController.createInforme);       // Crear un nuevo informe de calidad
router.put('/:id', calidadController.updateInforme);     // Actualizar un informe por ID
router.delete('/:id', calidadController.deleteInforme);  // Eliminar un informe de calidad por ID

module.exports = router;
