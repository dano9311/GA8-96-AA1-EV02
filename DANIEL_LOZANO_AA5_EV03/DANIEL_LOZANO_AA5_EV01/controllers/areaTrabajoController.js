// controllers/areaTrabajoController.js
const db = require('../config/database');

// Obtener todos los trabajos
exports.getAllTrabajos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM trabajos_area');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los trabajos: ' + err.message });
    }
};

// Crear un nuevo trabajo
exports.createTrabajo = async (req, res) => {
    const { producto, estado, cantidad } = req.body;
    try {
        await db.query('INSERT INTO trabajos_area (producto, estado, cantidad) VALUES (?, ?, ?)', [producto, estado, cantidad]);
        res.status(201).json({ message: 'Trabajo creado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el trabajo: ' + err.message });
    }
};

// Actualizar un trabajo por ID
exports.updateTrabajo = async (req, res) => {
    const { id } = req.params;
    const { producto, estado, cantidad } = req.body;
    try {
        await db.query('UPDATE trabajos_area SET producto = ?, estado = ?, cantidad = ? WHERE id = ?', [producto, estado, cantidad, id]);
        res.json({ message: 'Trabajo actualizado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el trabajo: ' + err.message });
    }
};

// Eliminar un trabajo por ID
exports.deleteTrabajo = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM trabajos_area WHERE id = ?', [id]);
        res.json({ message: 'Trabajo eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el trabajo: ' + err.message });
    }
};
