const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');
const { genRolesAsignados } = require('../factories/rolesAsignadosFactory.js');

const genUsers = async () => {

    /* let usersGen = []
    for (let i = 1; i <= ctos; i++) { */
        const password = await bcrypt.hash('admin123', 10);
        let u =
        {
            nombre: fakerES.person.firstName(),
            apellido: fakerES.person.lastName(),
            email: fakerES.internet.email(),
            password: password,
            createdAt: new Date(),
            updatedAt: new Date()
        }


        /* usersGen.push(u)

    }
    return Promise.all(usersGen); */
    return u;
}

module.exports = {
    genUsers
}