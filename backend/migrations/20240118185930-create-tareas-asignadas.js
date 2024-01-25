'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tareas_asignadas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_tarea: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'tareas'
          },
          key: 'id'
        },
      },
      id_usuario: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tareas_asignadas');
  }
};