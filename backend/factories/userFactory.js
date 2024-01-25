const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');
const { RolesAsignados } = require('../models/roles_asignados.js');
const { recuperarId } = require('../database/conexionUsuario.js');

const genUsers = async (ctos = 1) => {
    
    /* let idRol = Math.floor(Math.random() * 2) + 1 */

    let usersGen = []
    for(let i = 1; i <= ctos; i++) {
        /*const password = await bcrypt.hash('1234', 10);*/
        let u = 
            {
            nombre: fakerES.person.firstName(),
            apellido: fakerES.person.lastName(),
            email: fakerES.internet.email(),
            password: fakerES.internet.password(),
            createdAt: new Date(),
            updatedAt: new Date()
            }
            usersGen.push(u)
        
        /* const rolAsignado = {
            id_rol: idRol,
            id_usuario: i,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await RolesAsignados.create(rolAsignado); */
    }
    return Promise.all(usersGen);
}

module.exports = {
    genUsers
}