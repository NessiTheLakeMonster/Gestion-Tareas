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

        // Cuando se crea un usuario, se le asigna el rol de usuario por defecto
        const rolAsignado = new Models.RolAsignado({
            id_usuario: usuario.id,
            id_rol: 2
        });
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

const modificarUsuario = async (id, nombre, apellido, email, password) => {
    try {
        const usuario = await Models.User.findOne({ where: { id } });
        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.email = email;
        usuario.password = password;
        return usuario.save();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

const deleteUsuario = async (id) => {
    try {
        const usuario = await Models.User.findOne({ where: { id } });
        usuario.destroy();
        return usuario;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

const asignarAdmin = async (id_usuario) => {
    try {
        const rolAsignado = new Models.RolesAsignados({
            id_usuario,
            id_rol: 1
        });
        return rolAsignado.save();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = {
    listarUsuarios,
    buscarUsuario,
    registrarUsuario,
    loginUsuario,
    modificarUsuario,
    deleteUsuario,
    asignarAdmin
}