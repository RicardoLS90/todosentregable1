// instancia para la conexion de la base de datos
const db= require('../utils/database');

// tipos de datos de sequielize  varchar=== string
const { DataTypes } = require('sequelize');
// definir el modelo de usuarios
// los modelos se definen con una mayuscula

// acepta dos parametros, el primero es el nombre de la tabla
// y el segundo los atributos de la tabla (objeto)
const Users= db.define("users", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: true,
    validate: {
      isEmail:true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Users;