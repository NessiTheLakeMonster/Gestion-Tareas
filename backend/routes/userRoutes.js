const {Router} = require('express');
const controlador = require('../controllers/userController');
const router = Router();
const {validarCampos} = require('../middlewares/validarCampos');
const {check} = require('express-validator');
const { emailExiste } = require('../helpers/customUnique');

router.get('/', controlador.usuariosGet);
router.get('/:id', controlador.usuariosGetById);
router.delete('/:id', controlador.usuariosDelete);

router.post('/',
    /* [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email no es válido').isEmail(),
        check('email').custom(emailExiste),
        check('password', 'El campo contraseña es obligatorio').not().isEmpty(),
        check('password', 'El campo contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
        validarCampos
    ], */
    controlador.usuariosPost);

router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email no es válido').isEmail(),
        check('password', 'El campo contraseña es obligatorio').not().isEmpty(),
        check('password', 'El campo contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    controlador.usuariosPut);


module.exports = router;