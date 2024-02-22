const { Router } = require('express');
const userController = require('../controllers/userController');
const tareaController = require('../controllers/tareaController');
const router = Router()
const { check } = require('express-validator');
const { emailExiste } = require('../helpers/customUnique');
const esAdmin = require('../middlewares/esAdmin');

router.get('/usuarios/', userController.listarUsuarios);
router.get('/usuarios/:id', userController.buscarUsuario);

router.post('/usuarios/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('email', 'Email en uso, utilice otro').custom(emailExiste),
        check('password', 'El contraseña es obligatoria').isLength({ min: 6 })
    ], userController.registroUsuario);

router.post('/usuarios/login', userController.loginUsuario);
router.post('/usuarios/addRol/:id', userController.addRoles);

router.post('/usuarios/asignarTarea/:id/:tarea', userController.asignarTarea);

// -------------------------------- TAREAS ------------------------------------------

router.get('/tareas/', tareaController.listarTareas);
router.get('/tareas/:id', tareaController.buscarTarea);


module.exports = router;