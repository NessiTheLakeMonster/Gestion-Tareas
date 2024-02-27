'use strict';
const { genUsers } = require('../factories/userFactory.js');
const { genRolesAsignados } = require('../factories/rolesAsignadosFactory.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    try {
      for (let i = 1; i <= 5; i++) {
        const fakeUsers = [];
        let u = await genUsers();
        fakeUsers.push(u);


        await queryInterface.bulkInsert('users', fakeUsers, {});

        // Recuperas el id del usuario que acabas de insertar
        const usuario = await queryInterface.sequelize.query(
          `SELECT id FROM users WHERE email = '${fakeUsers[0].email}'`
        );

        // Generas los roles asignados para ese usuario
        const fakeRolesAsignados = [];
        let r = await genRolesAsignados(usuario[0][0].id);
        fakeRolesAsignados.push(r);
        await queryInterface.bulkInsert('roles_asignados', fakeRolesAsignados, {});
      }

    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterfae.bulkDelete('People', null, {});
     */
  }
};
