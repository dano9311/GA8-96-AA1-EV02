// controllers/authController.js
const jwt = require('jsonwebtoken');
const connection = require('../config/database');
const secretKey = 'tu_clave_secreta';

exports.login = async (req, res) => {
  const { usuario, clave } = req.body;
  try {
    const [results] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?",
      [usuario, clave]
    );

    if (results.length > 0) {
      const token = jwt.sign({ usuario: results[0].usuario }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: 'Inicio de sesión correcto', token });
    } else {
      res.status(401).send('Datos incorrectos');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
};

exports.register = async (req, res) => {
  // Código para registrar un nuevo usuario
};
