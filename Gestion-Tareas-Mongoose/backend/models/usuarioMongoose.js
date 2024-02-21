const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'El nombre es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }, 
    roles: {
        type: Array,
        required: [true, 'El rol es obligatorio']
    },
    tarea_asignada: {
        type: Array
    }
}, { collection: 'usuarios', versionKey: false });

const userModel = mongoose.model('Usuario', userSchema);

module.exports = userModel;