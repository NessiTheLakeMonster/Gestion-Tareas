'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: models.RolesAsignados ,
        as: 'usuarios',
        foreignKey: 'id_rol'
      })
    }
  }
  roles.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles'
  });
  return roles;
};