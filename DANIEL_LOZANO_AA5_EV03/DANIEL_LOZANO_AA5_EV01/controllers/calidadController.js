// controllers/calidadController.js
const db = require('../config/database');

// Obtener todos los informes de calidad
exports.getAllInformes = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM calidad');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los informes de calidad: ' + err.message });
    }
};

// Crear un nuevo informe de calidad
exports.createInforme = async (req, res) => {
    const { informe, autor } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO calidad (informe, autor) VALUES (?, ?)', 
            [informe, autor]
        );
        const newInforme = { id: result.insertId, informe, autor }; // Obtenemos el `id` insertado
        res.status(201).json(newInforme); // Devolvemos el nuevo informe completo con su `id`
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el informe de calidad: ' + err.message });
    }
};

// Actualizar un informe por ID
exports.updateInforme = async (req, res) => {
    const { id } = req.params;
    const { informe, autor } = req.body;
    try {
        await db.query(
            'UPDATE calidad SET informe = ?, autor = ? WHERE id = ?', 
            [informe, autor, id]
        );
        res.json({ message: 'Informe actualizado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el Informe: ' + err.message });
    }
};

// Eliminar un informe de calidad por ID
exports.deleteInforme = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM calidad WHERE id = ?', [id]);
        res.json({ message: 'Informe de calidad eliminado' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el informe de calidad: ' + err.message });
    }
};
