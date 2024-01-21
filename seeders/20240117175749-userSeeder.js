'use strict';
const bcrypt = require('bcrypt');
const { genUsers } = require('../factories/userFactory.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const constAdminPassword = await bcrypt.hash('admin123', 10);

    const adminUser = {
      nombre: 'administador',
      apellido: 'administrador',
      email: 'administrador@administrador.com',
      password: constAdminPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const fakeUsers = await genUsers(5);
    const users = [adminUser, fakeUsers];

    await queryInterface.bulkInsert('users', users, {});
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
