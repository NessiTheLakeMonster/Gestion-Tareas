const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'El id es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    dificultad: {
        type: String,
        required: [true, 'La dificultad es obligatoria']
    },
    horas_previstas: {
        type: Number,
        required: [true, 'Las horas previstas son obligatorias']
    },
    horas_realizadas: {
        type: Number,
        required: false
    },
    realizacion: {
        type: Number,
        required: false
    },
    completada: {
        type: Boolean,
        required: [true, 'La completada es obligatoria']
    }
}, { collection: 'tareas', versionKey: false });

const tareaModel = mongoose.model('Tarea', tareaSchema);

module.exports = tareaModel;