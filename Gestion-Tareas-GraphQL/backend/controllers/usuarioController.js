const { response, request } = require('express');
const Models = require('../models/index.js');

const listarUsuarios = async () => {
    try {
        const usuarios = await Models.User.findAll();
        return usuarios;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
};

const buscarUsuario = async (_, { id }) => {
    try {
        const usuario = await Models.User.findOne({ where: { id } });
        return usuario;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
};

const registrarUsuario = async (nombre, apellido, email, password) => {
    try {
        const usuario = new Models.User({
            nombre,
            apellido,
            email,
            password
        });
        return usuario.save();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

const loginUsuario = async (email, password) => {
    try {
        const usuario = await Models.User.findOne({ where: { email, password } });
        return usuario;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = {
    listarUsuarios,
    buscarUsuario,
    registrarUsuario,
    loginUsuario
}