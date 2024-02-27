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
        id_rol: ID
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
    }

    type Mutation {
        registrarUsuario(nombre: String!, apellido: String!, email: String!, password: String!): User
        loginUsuario(email: String!, password: String!): User
        asignarTarea(id_usuario: ID!, id_tarea: ID!): TareaAsignada
    }
`

module.exports = typeDefs;