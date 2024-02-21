const { Router } = require('express');
const userController = require('../controllers/userController');
const router = Router()

router.get('/', userController.listarUsuarios);
router.post('/', userController.registroUsuario);
router.post('/login', userController.loginUsuario);

module.exports = router;