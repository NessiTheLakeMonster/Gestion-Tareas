const {Sequalize, Op} = require('sequelize');
const models = require('../models/index.js');
const ConexionSequalize = require('./conexionSequalize.js');

class conexionUsuario {

    constructor() {
        this.con = new ConexionSequalize();
    }

    /* -------------------- FUNCIONES DE LA TABLA DE USUARIOS ------------------ */

    getUsuarios = async () => {
        let resultado = [];
        this.con.conectar();
        console.log('Obteniendo usuarios...');

        resultado = await models.User.findAll({
            attributes:
                [
                    'id',
                    'nombre',
                    'apellido',
                    'email',
                    'password']
        });

        this.con.desconectar();
        return resultado;
    }

    getUsuarioById = async (id) => {
        let resultado = [];
        this.con.conectar();

        resultado = await models.User.findByPk(id);

        this.con.desconectar();
        if (!resultado) {
            throw error;
        }

        return resultado;
    }

    registrarUsuario = async (body) => {
        let resultado = 0;
        this.con.conectar();

        try {
            const usuarioNuevo = await models.User.create(body);
            resultado = 1;
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.log(`El id ${body.id} ya existe en la base de datos.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
            throw error;
        } finally {
            this.con.desconectar();
        }

        return resultado;
    }

    modificarUsuario = async (id, body) => {
        this.con.conectar();
        let resultado = await models.User.findByPk(id);

        if (!resultado) {
            this.con.desconectar()
            throw error;
        }

        await resultado.update(body);
        this.con.desconectar();
        return resultado;
    }

    borrarUsuario = async (id) => {
        this.con.conectar();
        let resultado = await models.User.findByPk(id);

        if (!resultado) {
            this.con.desconectar()
            throw error;
        }

        await resultado.destroy();
        this.con.desconectar();
        return resultado;
    }

    login = async (email, password) => {
        let resultado = [];
        this.con.conectar();

        resultado = await models.User.findOne({
            where: {
                email: email,
                password: password
            }
        });

        this.con.desconectar();
        if (!resultado) {
            throw error;
        }

        return resultado;
    }

    getUserByEmail = async (email) => {
        let resultado = [];
        this.con.conectar();

        resultado = await models.User.findOne({
            where: {
                email: email
            }
        });

        this.con.desconectar();
        if (!resultado) {
            throw error;
        }

        return resultado;
    }

    recuperarIdUsuario = async (email) => {
        let resultado = [];
        this.con.conectar();

        resultado = await models.User.findOne({
            where: {
                email: email
            }
        });

        this.con.desconectar();
        if (!resultado) {
            throw error;
        }

        return resultado.id;
    }
}

module.exports = conexionUsuario;