'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword}=require('../helpers')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
      User.belongsTo(models.Department)
    }
  };
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Name cannot be Empty"
        },
        len:{
          args: [2,30],
          msg: "Min 2 and Max 30 chars"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:{
          msg:"Invalid email",
        },
      },
      unique:{
        msg:"Please Choose another Email"
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Password cannot be Empty"
        },
        len: {
          args: [6],
          msg: "Please enter longer password"
        }
      },
    },
  }, {
    hooks:{
      beforeCreate:(User, option)=>{
        User.password= hashPassword(User.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};