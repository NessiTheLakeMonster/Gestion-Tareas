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

const crearTarea = async (req, res) => {
    const conx = new Conexion();
    const body = req.body;

    conx.postTarea(req.body.descripcion, req.body.dificultad, req.body.horas_previstas, req.body.horas_realizadas, req.body.realizacion, req.body.completada)
        .then(msg => {
            console.log(body);
            console.log('Insertado correctamente!');
            res.status(201).json({
                'ok': true,
                'msg': 'Tarea registrada correctamente!'
            });
        })
        .catch(err => {
            console.log(err);
            console.log('Fallo en el registro!');
            res.status(400).json({
                'ok': false,
                'msg': 'Error en el registro de la tarea!'
            });
        });
}

const actualizarTarea = async (req, res) => {
    const conx = new Conexion();
    const body = req.body;

    conx.putTarea(req.params.id, req.body.descripcion, req.body.dificultad, req.body.horas_previstas, req.body.horas_realizadas, req.body.realizacion, req.body.completada)
        .then(msg => {
            console.log(body);
            console.log('Actualizado correctamente!');
            res.status(201).json({
                'ok': true,
                'msg': 'Tarea actualizada correctamente!'
            });
        })
        .catch(err => {
            console.log(err);
            console.log('Fallo en la actualización!');
            res.status(400).json({
                'ok': false,
                'msg': 'Error en la actualización de la tarea!'
            });
        });
}

const marcarTareaCompletada = async (req, res) => {
    const conx = new Conexion();

    conx.marcarCompletada(req.params.id)
        .then((resultado) => {
            res.json({
                ok: true,
                'msg': 'Tarea completada:',
                resultado
            });
        })
        .catch((error) => {
            res.status(500).json({
                ok: false,
                'msg': 'Error a la hora de marcar la tarea como completada:',
                error
            });
        });
}

const borrarTarea = async (req, res) => {
    const conx = new Conexion();

    conx.deleteTarea(req.params.id)
        .then((resultado) => {
            res.json({
                ok: true,
                'msg': 'Tarea eliminada:',
                resultado
            });
        })
        .catch((error) => {
            res.status(500).json({
                ok: false,
                'msg': 'Error a la hora de eliminar la tarea:',
                error
            });
        });
}

module.exports = {
    listarTareas,
    buscarTarea,
    crearTarea,
    actualizarTarea,
    marcarTareaCompletada,
    borrarTarea
}