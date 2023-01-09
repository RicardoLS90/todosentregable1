const db= require('../utils/database');
const { DataTypes } = require('sequelize');
const Categories = require('./categories.model');
const Todos = require('./todos.model');

const Todos_categories= db.define("todos_categories", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "category_id",
    references: {
      model: Categories,
      key: "id"
    }
  },
  todoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "todo_id",
    references: {
      model: Todos,
      key: "id"
    }
  },
},
{
  timestamps: false
});

module.exports= Todos_categories;