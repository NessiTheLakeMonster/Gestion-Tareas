'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.TareaAsignada, {
        foreignKey: 'id_usuario',
        as: 'tareasUsuario'
      }),
      this.belongsToMany(models.Roles, {
        through: models.RolesAsignados,
        as: 'roles',
        foreignKey: 'id_usuario'
      })
    }
  }
  user.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return user;
};