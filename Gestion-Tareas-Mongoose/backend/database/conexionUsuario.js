const UserModel = require('../models/usuarioMongoose');
const TareaModel = require('../models/tareaMongoose');

class ConexionUsuario {

    getUsuarios = async () => {
        let resultado = [];

        try {
            resultado = await UserModel.find();
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getUsuarioById = async (id) => {
        let resultado = [];

        try {
            resultado = await UserModel.findOne({ id });
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    loginUsuario = async (email, password) => {
        let resultado = await UserModel.findOne({ email, password });

        if (!resultado) {
            throw new Error("Inicio de sesión incorrecto");
        }

        return resultado;
    }

    postUsuario = async (nombre, apellido, email, password) => {
        let resultado = [];

        try {

            const lastIUser = await UserModel.find().sort({ id: -1 }).limit(1);
            const lastId = lastIUser[0].id;
            const newId = lastId + 1;
            const roles = ['programador'];

            const user = new UserModel({
                id: newId,
                nombre,
                apellido,
                email,
                password,
                roles: roles
            });

            resultado = await user.save();

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    putUsuario = async (id, nombre, apellido, email, password, roles) => {
        let resultado = [];

        try {
            resultado = await UserModel.updateOne({ id }, { nombre, apellido, email, password, roles });
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    putRolesUsuario = async (id, roles) => {
        let resultado = [];

        try {
            resultado = await UserModel.updateOne({ id }, { $addToSet: { roles: { $each: roles } } });
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    asignarTareaUsuario = async (idUsuario, idTarea) => {
        let resultado = [];

        try {

            let tarea = await TareaModel.findOne({ id: idTarea });
            console.log(idUsuario);
            console.log(idTarea);
            console.log(tarea);

            if (!tarea) {
                throw new Error("Tarea no encontrada");
            } else {
                resultado = await UserModel.updateOne({ id: idUsuario }, { $addToSet: { tarea_asignada: tarea } });
            }
            return resultado;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports = ConexionUsuario;