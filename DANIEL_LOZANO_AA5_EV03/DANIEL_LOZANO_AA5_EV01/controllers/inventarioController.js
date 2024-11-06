// controllers/inventarioController.js
const db = require('../config/database');

// Obtener todos los productos del inventario
exports.getAllItems = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM inventario');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los productos del inventario: ' + err.message });
    }
};

// Crear un nuevo producto en el inventario
exports.createItem = async (req, res) => {
    const { producto, proveedor, cantidad, precio } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO inventario (producto, proveedor, cantidad, precio) VALUES (?, ?, ?, ?)', 
            [producto, proveedor, cantidad, precio]
        );
        const newItem = { id: result.insertId, producto, proveedor, cantidad, precio }; // Obtenemos el `id` insertado
        res.status(201).json(newItem); // Devolvemos el nuevo producto completo con su `id`
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el producto en el inventario: ' + err.message });
    }
};

// Actualizar un producto por ID
exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { producto, proveedor, cantidad, precio } = req.body;
    try {
        await db.query(
            'UPDATE inventario SET producto = ?, proveedor = ?, cantidad = ?, precio = ? WHERE id = ?', 
            [producto, proveedor, cantidad, precio, id]
        );
        res.json({ message: 'Producto actualizado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el producto: ' + err.message });
    }
};

// Eliminar un producto del inventario por ID
exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM inventario WHERE id = ?', [id]);
        res.json({ message: 'Producto eliminado del inventario' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el producto: ' + err.message });
    }
};
