// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');
const secretKey = 'tu_clave_secreta';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).send('Token requerido');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).send('Token inválido');
    req.usuario = decoded.usuario;
    next();
  });
};

module.exports = verifyToken;
