'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles_asignados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Roles, {
        foreignKey: 'id_rol',
        as: 'roles'
      }),
      this.belongsTo(models.User, {
        foreignKey: 'id_usuario',
        as: 'users'
      })
    }
  }
  roles_asignados.init({
    id_rol: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RolesAsignados',
    tableName: 'roles_asignados'
  });
  return roles_asignados;
};