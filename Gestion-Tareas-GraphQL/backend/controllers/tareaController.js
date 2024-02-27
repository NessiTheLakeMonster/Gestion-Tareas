const { response, request } = require('express');
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

module.exports = {
    listarTareas,
    verTareasUsuario,
    asignarTarea
}