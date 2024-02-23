const { Router } = require('express');
const userController = require('../controllers/userController');
const tareaController = require('../controllers/tareaController');
const router = Router()
const { check } = require('express-validator');
const { emailExiste } = require('../helpers/customUnique');
const midRoles = require('../middlewares/midRoles');
const validarJWT = require('../middlewares/validarJWT');
const { validarCampos } = require('../helpers/validarCampos');

router.get('/usuarios/', [validarJWT.validarJWT, midRoles.esAdmin], userController.listarUsuarios);
router.get('/usuarios/:id', [validarJWT.validarJWT, midRoles.esAdmin], userController.buscarUsuario);

router.post('/usuarios/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        /* check('email', 'Email en uso, utilice otro').custom(emailExiste), */
        check('password', 'El contraseña es obligatoria').isLength({ min: 6 }),
        validarCampos
    ],
    userController.registroUsuario);

router.delete('/usuarios/:id', [validarJWT.validarJWT, midRoles.esAdmin], userController.borrarUsuario);
router.post('/usuarios/login', userController.loginUsuario);
router.post('/usuarios/addRol/:id', [validarJWT.validarJWT, midRoles.esAdmin], userController.addRoles);

router.post('/usuarios/asignarTarea/:id/:tarea', [validarJWT.validarJWT, midRoles.esAdmin], userController.asignarTarea);

// -------------------------------- TAREAS ------------------------------------------

router.get('/tareas/', tareaController.listarTareas);
router.get('/tareas/:id', tareaController.buscarTarea);

router.post('/tareas/',
    [
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('dificultad', 'La dificultad es obligatoria').not().isEmpty(),
        check('dificultad', 'La dificultad debe ser baja, media o alta').isIn(['baja', 'media', 'alta']),
        check('horas_previstas', 'Las horas previstas son obligatorias').not().isEmpty(),
        check('horas_realizadas', 'Las horas realizadas son obligatorias').not().isEmpty(),
        check('realizacion', 'La realización es obligatoria').not().isEmpty(),
        check('completada', 'La completada es obligatoria').not().isEmpty(),
        validarCampos
    ],
    tareaController.crearTarea);

router.get('/misTareas/:id', [validarJWT.validarJWT], userController.verTareasUsuario);

router.put('/tareas/:id',
    [
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('dificultad', 'La dificultad es obligatoria').not().isEmpty(),
        check('dificultad', 'La dificultad debe ser baja, media o alta').isIn(['baja', 'media', 'alta']),
        check('horas_previstas', 'Las horas previstas son obligatorias').not().isEmpty(),
        check('horas_realizadas', 'Las horas realizadas son obligatorias').not().isEmpty(),
        check('realizacion', 'La realización es obligatoria').not().isEmpty(),
        check('completada', 'La completada es obligatoria').not().isEmpty(),
        validarCampos
    ],
    tareaController.actualizarTarea);

router.delete('/tareas/:id', tareaController.borrarTarea);

router.put('/tareas/completada/:id', [validarJWT.validarJWT], tareaController.marcarTareaCompletada);
router.get('/tareasPendientes/:id', [validarJWT.validarJWT], userController.tareasPendientes);
router.get('/tareasCompletadas/:id', [validarJWT.validarJWT], userController.tareasCompletadas);

router.get('/ranking', [validarJWT.validarJWT], userController.rankingUsuarios);

module.exports = router;