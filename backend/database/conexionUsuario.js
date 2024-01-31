const { Sequelize, Op } = require('sequelize');
const models = require('../models/index.js');
const ConexionSequelize = require('./conexionSequelize.js');
const bcrypt = require('bcrypt');

class conexionUsuario {

    constructor() {
        this.con = new ConexionSequelize();
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
            const usuarioNuevo = await models.User.create(body)

            // Cuando se crea un usuario, se le asigna el rol de programador por defecto
            const rolAsignado = await models.RolesAsignados.create({
                id_rol: 2,
                id_usuario: usuarioNuevo.id
            })
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

    /* -------------------- FUNCIONES PARA EL INICIO DE SESIÓN ------------------ */

    login = async (email, password) => {
        let resultado = 0
        this.con.conectar();

        try {
            resultado = await models.User.findOne({
                where: {
                    email: email
                }
            })

            if (!resultado) {
                this.con.desconectar()
                throw error;
            }

            let passwdHashed = await bcrypt.compare(password, resultado.password)

            if (!passwdHashed) {
                return null;
            }

        } catch (error) {
            console.log(error);
            this.con.desconectar();
            throw error;
        }

        this.con.desconectar();
        return resultado;
    }

    /* -------------------- FUNCIONES PARA EL VALIDATOR ------------------ */

    emailExisteValidator = async (email) => {
        let resultado = [];
        this.con.conectar();

        resultado = await models.User.findAll({
            where: {
                email: email
            }
        });

        this.con.desconectar();
        if (!resultado) {
            throw error;
        }
    }

}

module.exports = conexionUsuario;