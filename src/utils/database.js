const {Sequelize} = require('sequelize');

// crear una instancia con parametros de configuracion de nuestra base de datos
// un objeto de configuraicon ---> credenciales de base de datos
const db = new Sequelize({
  database: "todoapp",
  username: "postgres",
  host: "localhost",
  port: "5432",
  password: "root",
  dialect: "postgres"
});

module.exports= db;