// vamos a importar todos nuestros modelos creados
const Categories = require('./categories.model');
const Todos = require('./todos.model');
const Todos_categories = require('./todos_categories.model');
const Users = require('./users.model');

const initModels= ()=>{
  //vamos a crear las relaciones
  // hasOne-- para indicar q tiene uno
  // hasMany-- para indicar q tiene muchos
  // belongsTo-- para decir q pertenece a
  Todos.belongsTo(Users, {as:'author', foreignKey:'user_id'});
  Users.hasMany(Todos, {as:"Task", foreignKey: 'user_id' });
  //relacion ManytoMany M-M
  Todos_categories.belongsTo(Todos, {as:'task', foreignKey:'todo_id' });
  Todos.hasMany(Todos_categories, {as:'category', foreignKey:'todo_id' });

  Todos_categories.belongsTo(Categories, {as:'categories', foreignKey:'category_id'})
  Categories.hasMany(Todos_categories, {as:'task', foreignKey:'category_id'});

};

module.exports = initModels;