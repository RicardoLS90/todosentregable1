const db= require('../utils/database')
const Users= require('../models/users.model')
const Todos= require('../models/todos.model')



const users= [
  {username: 'ricardo', email: 'rleons40@gmail.com', password: '1234'},
  {username: 'miguel', email: 'rleons30@gmail.com', password: '1234'},
  {username: 'leon', email: 'rleons20@gmail.com', password: '1234'},
];
const todos=[
  {tittle: 'tarea1', description: 'asisistir a la clase', userId: 1},
  {tittle: 'tarea2', description: 'asisistir a la clase', userId: 1},
  {tittle: 'tarea imposible', userId: 2},
  {tittle: 'tarea facil', description: 'asisistir a la clase', userId: 3}
];
// const categories=[];
// const todosCategories=[];

db.sync({force:false})
  .then(()=>{
    console.log('iniciando con el seed de prueba');
    users.forEach((user)=>Users.create(user));
    setTimeout(()=> {
      todos.forEach((todo)=>Todos.create(todo));
    },100)
  })
  .catch((error)=> console.log(error));