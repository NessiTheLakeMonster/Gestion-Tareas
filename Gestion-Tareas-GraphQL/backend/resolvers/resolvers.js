const { v4: uuidv4 } = require('uuid');
const { listarUsuarios, buscarUsuario, registrarUsuario, loginUsuario, modificarUsuario, deleteUsuario, asignarAdmin, verRolesUsuario } = require('../controllers/usuarioController');
const { listarTareas, verTareasUsuario, asignarTarea, crearTarea, modificarTarea, marcarTareaCompletada, verTareasCompletadas, verTareasPendientes, deleteTarea } = require('../controllers/tareaController');
const { Usuario } = require('../models/user');

const resolvers = {
    Query: {
        usuarios: () => listarUsuarios(),
        tareas: () => listarTareas(),
        buscarUsuario: async (_, { id }) => buscarUsuario(_, { id }),
        verTareasUsuario: async (_, { id }) => verTareasUsuario(id),
        verTareasCompletadas: () => verTareasCompletadas(),
        verTareasPendientes: () => verTareasPendientes(),
        verRolesUsuario: async (_, { id }) => verRolesUsuario(id)
    },
    Mutation: {
        registrarUsuario: async (_, { nombre, apellido, email, password }) => registrarUsuario(nombre, apellido, email, password),
        loginUsuario: async (_, { email, password }) => loginUsuario(email, password),
        asignarTarea: async (_, { id_usuario, id_tarea }) => asignarTarea(id_usuario, id_tarea),
        modificarUsuario: async (_, { id, nombre, apellido, email, password }) => modificarUsuario(id, nombre, apellido, email, password),
        deleteUsuario: async (_, { id }) => deleteUsuario(id),
        crearTarea: async (_, { descripcion, dificultad, horas_previstas, horas_realizadas, realizacion, completada }) => crearTarea(descripcion, dificultad, horas_previstas, horas_realizadas, realizacion, completada),
        modificarTarea: async (_, { id, descripcion, dificultad, horas_previstas, horas_realizadas, realizacion, completada }) => modificarTarea(id, descripcion, dificultad, horas_previstas, horas_realizadas, realizacion, completada),
        marcarTareaCompletada: async (_, { id }) => marcarTareaCompletada(id),
        asignarAdmin: async (_, { id }) => asignarAdmin(id),
        deleteTarea: async (_, { id }) => deleteTarea(id)
    }
}

module.exports = resolvers;