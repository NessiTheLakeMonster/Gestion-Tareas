const { Sequalize, Op } = require('sequelize');
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
            attributes: ['id', 'nombre', 'apellido', 'email', 'password', 'admin']
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
            this.desconectar();
        }

        return resultado;
    }
}