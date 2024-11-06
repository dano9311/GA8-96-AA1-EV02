const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, usuariosController.getAllUsuarios);
router.post('/create', verifyToken, usuariosController.createUsuario);
router.put('/update', verifyToken, usuariosController.updateUsuario);
router.patch('/updatePassword', verifyToken, usuariosController.updatePassword);
router.delete('/delete', verifyToken, usuariosController.deleteUsuario);

module.exports = router;
