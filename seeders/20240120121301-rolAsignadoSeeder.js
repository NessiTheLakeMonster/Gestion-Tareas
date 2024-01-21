'use strict';
const bcrypt = require('bcrypt');

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

    /* 
        let constAdminPassword = await bcrypt.hash('admin123', 10);
    
        const adminUser = {
          nombre: 'administador',
          apellido: 'administrador',
          email: 'administrador@administrador.com',
          password: constAdminPassword,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    
        const [adminUserId] = await queryInterface.bulkInsert('users', [adminUser], { returning: true });
    
        const rolAdminAsignado = {
          rolId: adminUserId,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    
        await queryInterface.bulkInsert('rolAsignado', [rolAdminAsignado], {});w
       */
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
