'use strict';
const { genRolesAsignados } = require('../factories/rolesAsignadosFactory.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /* try {
      const fakeRolesAsignados = await genRolesAsignados(5);
      await queryInterface.bulkInsert('roles_asignados', fakeRolesAsignados, {});
    } catch (error) {
      console.log(error);
    } */

   /*  await queryInterface.bulkInsert('roles_asignados', [
      {
        id_rol: 1,
        id_usuario: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_rol: 2,
        id_usuario: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_rol: 1,
        id_usuario: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_rol: 2,
        id_usuario: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_rol: 1,
        id_usuario: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}); */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
