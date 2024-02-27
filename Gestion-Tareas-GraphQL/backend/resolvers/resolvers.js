const { v4: uuidv4 } = require('uuid');
const { listarUsuarios, buscarUsuario, registrarUsuario, loginUsuario } = require('../controllers/usuarioController');
const { listarTareas, verTareasUsuario, asignarTarea } = require('../controllers/tareaController');
const { Usuario } = require('../models/user');

const resolvers = {
    Query: {
        usuarios: () => listarUsuarios(),
        tareas: () => listarTareas(),
        buscarUsuario: async (_, { id }) => buscarUsuario(_, { id }),
        verTareasUsuario: async (_, { id }) => verTareasUsuario(id)
    },
    Mutation: {
        registrarUsuario: async (_, { nombre, apellido, email, password }) => registrarUsuario(nombre, apellido, email, password),
        loginUsuario: async (_, { email, password }) => loginUsuario(email, password),
        asignarTarea: async (_, { id_usuario, id_tarea }) => asignarTarea(id_usuario, id_tarea)
    }
}

module.exports = resolvers;