const Models = require('../models/index.js');

const listarTareas = async () => {
    try {
        const tareas = await Models.Tarea.findAll();
        return tareas;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
};

const verTareasUsuario = async (id) => {
    try {
        const tareas = await Models.TareaAsignada.findAll({
            where: {
                id_usuario: id
            },
            include: {
                model: Models.Tarea,
                as: 'tarea',
                attributes: ['id', 'descripcion', 'dificultad', 'horas_previstas', 'horas_realizadas', 'realizacion', 'completada']
            },
            attributes: ['id', 'id_usuario', 'id_tarea']
        });
        return tareas;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
};

const asignarTarea = async (id_usuario, id_tarea) => {
    try {
        const tareaAsignada = new Models.TareaAsignada({
            id_usuario,
            id_tarea
        });
        return tareaAsignada.save();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

const crearTarea = async (descripcion, dificultad, horas_previstas, horas_realizadas, realizacion, completada) => {
    try {
        const tarea = new Models.Tarea({
            descripcion,
            dificultad,
            horas_previstas: parseInt(horas_previstas, 10),
            horas_realizadas: parseInt(horas_realizadas, 10),
            realizacion: parseInt(realizacion, 10),
            completada: completada === 'false'
        });

        return tarea.save();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
};

const modificarTarea = async (id, descripcion, dificultad, horas_previstas, horas_realizadas, realizacion, completada) => {
    try {
        horas_previstas = parseInt(horas_previstas, 10);
        horas_realizadas = parseInt(horas_realizadas, 10);
        realizacion = parseInt(realizacion, 10);
        completada = completada === 'true';

        const tarea = await Models.Tarea.findOne({ where: { id } });
        tarea.descripcion = descripcion;
        tarea.dificultad = dificultad;
        tarea.horas_previstas = horas_previstas;
        tarea.horas_realizadas = horas_realizadas;
        tarea.realizacion = realizacion;
        tarea.completada = completada;
        return tarea.save();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

const marcarTareaCompletada = async (id) => {
    try {
        const tarea = await Models.Tarea.findByPk(id);
        tarea.completada = true;
        return tarea.save();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

const verTareasCompletadas = async () => {
    try {
        const tareas = await Models.Tarea.findAll({
            where: {
                completada: true
            }
        });
        return tareas;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

const verTareasPendientes = async () => {
    try {
        const tareas = await Models.Tarea.findAll({
            where: {
                completada: false
            }
        });
        return tareas;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

const deleteTarea = async (id) => {
    try {
        const tarea = await Models.Tarea.findOne({ where: { id } });
        tarea.destroy();
        return tarea;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = {
    listarTareas,
    verTareasUsuario,
    asignarTarea,
    crearTarea,
    modificarTarea,
    marcarTareaCompletada,
    verTareasCompletadas,
    verTareasPendientes,
    deleteTarea
}