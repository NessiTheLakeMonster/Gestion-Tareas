const { gql } = require('graphql-tag');

const typeDefs = gql`

    type User {
        id: ID!
        nombre: String
        apellido: String
        email: String
        password: String
    }

    type Tarea {
        id: ID!
        descripcion: String
        dificultad: String
        horas_previstas: Int
        horas_realizadas: Int
        realizacion: Int
        completada: Boolean
    }

    type Rol {
        id: ID
        nombre: String
    }

    type RolAsignado {
        id: ID
        id_usuario: ID
        users: User
        id_rol: ID
        roles: Rol
    }

    type TareaAsignada {
        id: ID
        id_usuario: ID
        id_tarea: ID
        tarea: Tarea
    }

    type Query {
        usuarios: [User]
        tareas: [Tarea]
        buscarUsuario(id: ID!): User
        verTareasUsuario(id: ID!): [TareaAsignada]
        verTareasCompletadas: [Tarea]
        verTareasPendientes: [Tarea]
        verRolesUsuario(id: ID!): [RolAsignado]
    }

    type Mutation {
        registrarUsuario(nombre: String!, apellido: String!, email: String!, password: String!): User
        loginUsuario(email: String!, password: String!): User
        asignarTarea(id_usuario: ID!, id_tarea: ID!): TareaAsignada
        modificarUsuario(id: ID!, nombre: String!, apellido: String!, email: String!, password: String!): User
        deleteUsuario(id: ID!): User
        crearTarea(descripcion: String!, dificultad: String!, horas_previstas: Int!, horas_realizadas: Int!, realizacion: Int!, completada: Boolean!): Tarea
        modificarTarea(id: ID!, descripcion: String!, dificultad: String!, horas_previstas: Int!, horas_realizadas: Int!, realizacion: Int!, completada: Boolean!): Tarea
        marcarTareaCompletada(id: ID!): Tarea
        asignarAdmin(id: ID!): RolAsignado
        deleteTarea(id: ID!): Tarea
    }
`

module.exports = typeDefs;