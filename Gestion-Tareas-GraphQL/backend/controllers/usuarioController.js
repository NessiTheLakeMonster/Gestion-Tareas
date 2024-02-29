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

        await usuario.save();

        // Cuando se registra un usuario, se le asigna el rol de programador por defecto
        const rolAsignado = new Models.RolesAsignados({
            id_usuario: usuario.id,
            id_rol: 2
        });

        await rolAsignado.save();

        return usuario;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
};

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

const asignarAdmin = async (id) => {
    try {
        const existingAdmin = await Models.RolesAsignados.findOne({
            where: {
                id_usuario: id,
                id_rol: 1
            }
        });

        if (existingAdmin) {
            throw new Error('El usuario ya es administrador');
        }

        const rolAsignado = new Models.RolesAsignados({
            id_usuario: id,
            id_rol: 1
        });

        return rolAsignado.save();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw new Error('Error al conectar a la base de datos');
    }
};

const verRolesUsuario = async (id) => {
    try {
        const rol = await Models.RolesAsignados.findAll({
            where: {
                id_usuario: id
            },
            include: [
                {
                    model: Models.User,
                    as: 'users',
                    attributes: ['id', 'nombre', 'apellido', 'email']
                },
                {
                    model: Models.Roles,
                    as: 'roles',
                    attributes: ['id', 'nombre']
                }
            ],
            attributes: ['id', 'id_usuario', 'id_rol']
        });
        return rol;
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
    asignarAdmin,
    verRolesUsuario
}