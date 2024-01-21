const { Router } = require('express');
const controlador = require('../controllers/tareaController');
const router = Router();

const { check } = require('express-validator');

router.get('/', controlador.tareasGet);
router.get('/:id', controlador.tareasGetById);

router.post('/',
    [
        check('titulo', 'El titulo es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('fecha', 'La fecha es obligatoria').not().isEmpty(),
        check('hora', 'La hora es obligatoria').not().isEmpty(),
        check('prioridad', 'La prioridad es obligatoria').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
    ],
    controlador.postTarea);

module.exports = router;