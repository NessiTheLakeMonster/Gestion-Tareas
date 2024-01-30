const {Sequelize, Op} = require('sequelize');
const models = require('../models/index.js');
const ConexionSequelize = require('./conexionSequelize.js');

class conexionRol {

    constructor() {
        this.con = new ConexionSequelize();
    }

    /* -------------------- FUNCIONES DE LA TABLA DE ROLES ------------------ */

    asignarAdmin = async (id) => {
        let resultado = 0;
        this.con.conectar();

        try {
            const rolNuevo = await models.RolesAsignados.create({
                id_usuario: id,
                id_rol: 1
            });
            resultado = 1;
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.log(`El id ${id} ya existe en la base de datos.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
        }

        this.con.desconectar();
        return resultado;
    }
}

module.exports = conexionRol;