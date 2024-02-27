const { faker, fakerES } = require('@faker-js/faker');
const { genRolesAsignados } = require('../factories/rolesAsignadosFactory.js');

const genUsers = async () => {
        
        let u =
        {
            nombre: fakerES.person.firstName(),
            apellido: fakerES.person.lastName(),
            email: fakerES.internet.email(),
            password: '1234',
            createdAt: new Date(),
            updatedAt: new Date()
        }

    return u;
}

module.exports = {
    genUsers
}