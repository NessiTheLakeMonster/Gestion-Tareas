const { Sequalize, Op } = require('sequelize');
const models = require('../models/index.js');

class ConexionSequalize {

    constructor() {
        this.db = new Sequalize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            pool: {
                max: 5,
                min: 0,
                require: 30000,
                idle: 10000
            },
        });
    }

    conectar = () => {
        this.db.authenticate()
            .then(() => {
                console.log('Conexión establecida correctamente.');
            })
            .catch(error => {
                console.error('No se pudo conectar a la base de datos:', error);
            });
    }

    desconectar = () => {
        // this.db.close();
        process.on('SIGINT', () => conn.close())
    }
}

module.exports = ConexionSequalize;