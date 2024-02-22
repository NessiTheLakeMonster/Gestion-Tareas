const Conexion = require('../database/conexionTarea.js');

const listarTareas = async (req, res) => {
    const conx = new Conexion();

    conx.getTarea()
        .then((resultado) => {
            res.json({
                ok: true,
                'msg': 'Listado de tareas:',
                resultado
            });
        })
        .catch((error) => {
            res.status(500).json({
                ok: false,
                'msg': 'Error a la hora de listar las tareas:',
                error
            });
        });
}

const buscarTarea = async (req, res) => {
    const conx = new Conexion();

    conx.getTareaById(req.params.id)
        .then((resultado) => {
            res.json({
                ok: true,
                'msg': 'Tarea encontrada:',
                resultado
            });
        })
        .catch((error) => {
            res.status(500).json({
                ok: false,
                'msg': 'Error a la hora de buscar la tarea:',
                error
            });
        });
}

module.exports = {
    listarTareas,
    buscarTarea
}