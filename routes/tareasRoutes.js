const {Router} = require('express');
const controlador = require('../controllers/tareaController');
const router = Router();

const {check} = require('express-validator');

router.get('/', controlador.tareasGet);
router.get('/:id', controlador.tareasGetById);
router.delete('/:id', controlador.deleteTarea);

router.post('/',
    [
        check('titulo', 'El titulo es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('dificultad', 'La dificultad es obligatoria').not().isEmpty(),
        check('horas_previstas', 'Las horas previstas son obligatorias').not().isEmpty(),
        check('horas_realizadas', 'Las horas realizadas son obligatorias').not().isEmpty(),
        check('realizacion', 'La realizacion es obligatoria').not().isEmpty(),
        check('completada', 'La completada es obligatoria').not().isEmpty(),
    ],
    controlador.postTarea);

router.put('/:id',
    [
        check('titulo', 'El titulo es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('dificultad', 'La dificultad es obligatoria').not().isEmpty(),
        check('horas_previstas', 'Las horas previstas son obligatorias').not().isEmpty(),
        check('horas_realizadas', 'Las horas realizadas son obligatorias').not().isEmpty(),
        check('realizacion', 'La realizacion es obligatoria').not().isEmpty(),
        check('completada', 'La completada es obligatoria').not().isEmpty(),
    ],
    controlador.putTarea);

router.post('/asignar/:idUsuario/:idTarea', controlador.postAsignaciones);

module.exports = router;