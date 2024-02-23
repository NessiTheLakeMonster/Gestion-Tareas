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

    verTareasUsuario = async (idUsuario) => {
        let resultado = [];

        try {
            resultado = await UserModel.findOne({ id: idUsuario }, { tarea_asignada: 1 });
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    checkRol = async (idUsuario, rol) => {
        let resultado = false;

        try {
            const user = await UserModel.findOne({ id: idUsuario, roles: rol });
            if (user) {
                resultado = true;
            }
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    rankingUsuarios = async () => {
        let resultado = [];

        try {
            resultado = await UserModel.find({ "tarea_asignada.completada": true }).sort({ completadas: -1 });
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    borrarUsuario = async (id) => {
        let resultado = [];

        try {
            resultado = await UserModel.deleteOne({ id });
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getTareasPendientes = async (idUsuario) => {
        let resultado = [];

        try {
            resultado = await UserModel.aggregate([
                {
                    $match:
                    {
                        id: Number(idUsuario)
                    }
                },
                { $unwind: "$tarea_asignada" },
                {
                    $match:
                    {
                        "tarea_asignada.completada": false
                    }
                }
            ]);

            console.log(resultado);
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getTareasCompletadas = async (idUsuario) => {
        let resultado = [];

        try {
            resultado = await UserModel.aggregate([
                {
                    $match:
                    {
                        id: Number(idUsuario)
                    }
                },
                { $unwind: "$tarea_asignada" },
                {
                    $match:
                    {
                        "tarea_asignada.completada": true
                    }
                }
            ]);

            console.log(resultado);
            return resultado;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ConexionUsuario;