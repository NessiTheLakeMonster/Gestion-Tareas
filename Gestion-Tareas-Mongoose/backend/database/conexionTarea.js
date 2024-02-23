const TareaModel = require('../models/tareaMongoose');

class ConexionTarea {

    getTarea = async () => {
        let resultado = [];

        try {
            resultado = await TareaModel.find();
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getTareaById = async (id) => {
        let resultado = [];

        try {
            resultado = await TareaModel.findOne({ id });
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    postTarea = async (descripcion, dificultad, horas_previstas, horas_realizadas, realizacion, completada) => {
        let resultado = [];

        try {
            const lastIUser = await TareaModel.find().sort({ id: -1 }).limit(1);

            if (lastIUser.length === 0) {
                const tarea = new TareaModel({
                    id: 1,
                    descripcion,
                    dificultad,
                    horas_previstas,
                    horas_realizadas,
                    realizacion,
                    completada
                });

                resultado = await tarea.save();
                return resultado;
            }

            const lastId = lastIUser[0].id;
            const newId = lastId + 1;

            const tarea = new TareaModel({
                id: newId,
                descripcion,
                dificultad,
                horas_previstas,
                horas_realizadas,
                realizacion,
                completada
            });

            resultado = await tarea.save();

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    putTarea = async (id, descripcion, dificultad, horas_previstas, horas_realizadas, realizacion, completada) => {
        let resultado = [];

        try {
            resultado = await TareaModel.updateOne({ id }, { descripcion, dificultad, horas_previstas, horas_realizadas, realizacion, completada });
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    marcarCompletada = async (id) => {
        let resultado = [];

        try {
            resultado = await TareaModel.updateOne({ id }, { completada: true });
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    deleteTarea = async (id) => {
        let resultado = [];

        try {
            resultado = await TareaModel.deleteOne({ id });
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports = ConexionTarea;