// routes/inventarioRoutes.js
const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

// Definición de las rutas para la gestión de inventario
router.get('/', inventarioController.getAllItems);        // Obtener todos los productos del inventario
router.post('/', inventarioController.createItem);        // Crear un nuevo producto en el inventario
router.put('/:id', inventarioController.updateItem);      // Actualizar un producto por ID
router.delete('/:id', inventarioController.deleteItem);   // Eliminar un producto del inventario por ID

module.exports = router;

