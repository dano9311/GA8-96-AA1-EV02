// routes/areaTrabajoRoutes.js
const express = require('express');
const router = express.Router();
const areaTrabajoController = require('../controllers/areaTrabajoController');

// Definición de las rutas y asignación de métodos del controlador
router.get('/', areaTrabajoController.getAllTrabajos);       // Obtener todos los trabajos
router.post('/', areaTrabajoController.createTrabajo);       // Crear un nuevo trabajo
router.put('/:id', areaTrabajoController.updateTrabajo);     // Actualizar un trabajo por ID
router.delete('/:id', areaTrabajoController.deleteTrabajo);  // Eliminar un trabajo por ID

module.exports = router;
