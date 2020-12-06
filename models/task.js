'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User)
      Task.belongsTo(models.Department)
    }
  };
  Task.init({
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Name cannot be Empty"
        },
        len: {
          args: [2],
          msg: "Title length Min 2 chars"
        }
      },
    },
    description: DataTypes.STRING,
    deadline: {
      type:DataTypes.DATEONLY,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Deadline cannot be Empty"},
        isAfter:{
          args: new Date().toString(),
          msg: "Deadline must be greater than today"
        }
      }
    },
    category: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{msg:"Category cannot be Empty"}
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};