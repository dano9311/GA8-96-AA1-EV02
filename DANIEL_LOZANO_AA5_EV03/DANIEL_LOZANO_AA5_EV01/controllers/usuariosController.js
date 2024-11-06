const connection = require('../config/database');

exports.getAllUsuarios = async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM `usuarios`');
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los usuarios');
  }
};

exports.createUsuario = async (req, res) => {
  const { usuario, clave, estado, rol } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO `usuarios` (`usuario`, `clave`, `estado`, `rol`) VALUES (?, ?, ?, ?)',
      [usuario, clave, estado || 'Activo', rol || 'Operario']
    );
    res.status(201).json({ id: result.insertId, usuario, clave, estado, rol });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear el usuario');
  }
};

exports.updateUsuario = async (req, res) => {
  const { id, usuario, estado, rol } = req.body;
  try {
    await connection.query(
      'UPDATE `usuarios` SET `usuario` = ?, `estado` = ?, `rol` = ? WHERE `id` = ?',
      [usuario, estado, rol, id]
    );
    res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el usuario');
  }
};

exports.updatePassword = async (req, res) => {
  const { id, clave } = req.body;
  try {
    await connection.query(
      'UPDATE `usuarios` SET `clave` = ? WHERE `id` = ?',
      [clave, id]
    );
    res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar la contraseña');
  }
};

exports.deleteUsuario = async (req, res) => {
  const { id } = req.body;
  try {
    await connection.query('DELETE FROM `usuarios` WHERE `id` = ?', [id]);
    res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el usuario');
  }
};
