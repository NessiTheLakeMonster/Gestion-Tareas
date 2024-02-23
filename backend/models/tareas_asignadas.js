'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tareas_asignadas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tarea, {
        foreignKey: 'id_tarea',
        as: 'tarea'
      });

      this.belongsTo(models.User, {
        foreignKey: 'id_usuario',
        as: 'users'
      });
    }
  }
  tareas_asignadas.init({
    id_tarea: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TareaAsignada',
    tableName: 'tareas_asignadas'
  });
  return tareas_asignadas;
};