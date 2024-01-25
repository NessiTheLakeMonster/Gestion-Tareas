'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'tareas_asignadas',
        as: 'usuarios',
        foreignKey: 'id_tarea'
      })
    }
  }
  tarea.init({
    descripcion: DataTypes.STRING,
    dificultad: DataTypes.STRING,
    horas_previstas: DataTypes.INTEGER,
    horas_realizadas: DataTypes.INTEGER,
    realizacion: DataTypes.INTEGER,
    completada: DataTypes.BOOLEAN,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tarea',
    tableName: 'tareas'
  });
  return tarea;
};