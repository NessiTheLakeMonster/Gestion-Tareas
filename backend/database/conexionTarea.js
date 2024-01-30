const {Seqealize, Op} = require('sequelize');
const models = require('../models/index.js');
const ConexionSequelize = require('./conexionSequelize.js');

class conexionTarea {

    constructor() {
        this.con = new ConexionSequelize();
    }

    /* -------------------- FUNCIONES DE LA TABLA DE TAREAS ------------------ */

    getTareas = async () => {
        let resultado = [];
        this.con.conectar();
        console.log('Obteniendo tareas...');

        resultado = await models.Tarea.findAll({
            attributes:
                [
                    'id',
                    'descripcion',
                    'dificultad',
                    'horas_previstas',
                    'horas_realizadas',
                    'realizacion',
                    'completada'
                ]
        });

        this.con.desconectar();
        return resultado;
    }

    getTareasById = async (id) => {
        let resultado = [];
        this.con.conectar();

        resultado = await models.Tarea.findByPk(id);

        this.con.desconectar();
        if (!resultado) {
            throw error;
        }

        return resultado;
    }

    registrarTarea = async (body) => {
        let resultado = 0;
        this.con.conectar();

        try {
            const tareaNueva = await models.Tarea.create(body);
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
            return resultado;
        }
    }

    modificarTarea = async (id, body) => {
        this.con.conectar();
        let resultado = await models.Tarea.findByPk(id);

        if (!resultado) {
            this.con.desconectar()
            throw error;
        }

        await resultado.update(body);
        this.con.desconectar();
        return resultado;
    }

    borrarTarea = async (id) => {
        this.con.conectar();
        let resultado = await models.Tarea.findByPk(id);

        if (!resultado) {
            this.con.desconectar()
            throw error;
        }

        await resultado.destroy();
        this.con.desconectar();
        return resultado;
    }

    /* -------------------- FUNCIONES PARA ASIGNACIONES DE TAREAS ------------------ */

    asignarTarea = async (idTarea, idUsuario) => {
        let resultado = 0;
        this.con.conectar();

        try {
            const tareaNueva = await models.TareaAsignada.create({
                id_tarea: idTarea,
                id_usuario: idUsuario
            });
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
            return resultado;
        }
    } 
}

module.exports = conexionTarea;