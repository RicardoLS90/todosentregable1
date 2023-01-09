//importamos express

const express = require ('express');
const db= require ('./utils/database')
const initModels= require ('./models/init.model');
const Users = require('./models/users.model');
const { json } = require('sequelize');
const Todos = require('./models/todos.model');

// crear instancia de express 
const app= express();
app.use(express.json())
const PORT = 8000;

//probando la conexion a la base de datos
db.authenticate()
  .then(()=>console.log('autenticacion exitosa'))
  .catch((error)=> console.log(error));

initModels();
// vamos a usar el metodo sync de nuestra db
db.sync({force: false})
  .then(()=> console.log('base de datos sincronizada'))
  .catch((error)=> console.log(error));

app.get ('/', (req, res)=>{
  res.status(200).json({message:'Bienvenido al servidor'})
});

//definir donde estaran las rutas de nuestrs endpoints
// todas las consulatas de usuarios
//localhost/8000/users  para todos los usarios
//localhost/8000/todos  para todas las tareas

//find all para get
app.get('/users',async (req,res)=> {
  try{
    //obtener como resultado todos los usuarios de la base de datos
    const result=await Users.findAll(
      {
        attributes: ["id","username","email"]
      }
    );
    res.status(200).json(result);
  } catch(error){console.log(error)}
});

//findOne para que me de como resultados un usuario de la base de datos

// app.get('/users/:email', async(req,res)=>{
//   try{
//     const {email}= req.params;
//     const result= await Users.findOne({
//       where: {email},
//       attributes: ['id', 'username', 'email']
//     });
//     res.status(200).json(result);
//   } catch(error) {
//     console.log(error);
//   }
// });

//findebypk buscar por llave primaria, si la sabemos nos ahorra el uso del where

// app.get('/users/:id', async(req,res)=>{
//   try{
//     const {id}= req.params;
//     const result= await Users.findByPk(id, {
//       attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
//     });
//     res.status(200).json(result);
//   }catch(error) {
//     console.log(error);
//   }
// });

//para crear usamos el metodo post
app.post('/users', async(req,res)=>{
  try{
    const newUser= req.body;
    console.log(newUser)
    //metodo create para crear nuevo usuario
    const result= await Users.create(newUser);
    res.status(201).json(result);
  }catch(error) {
    res.status(400).json(error.message);
        console.log(error)
  }
});

//como actualizar la informacion de una tabla
app.put('/users/:id', async(req,res)=>{
  try{
//obtener el id del rq.params
    const {id}= req.params;
    const data= req.body;
    const result= await Users.update(data,{
      where: {id}
    })
    res.status(200).json(result);
  }catch(error) {
    res.status(400).json(error.message);
        console.log(error);
  }
})


app.delete('/users/:id', async(req,res)=>{
  try{
    const {id}= req.params;
    const result= await Users.destroy({
      where:{id}
    });
    res.status(200).json(result);
  }catch (error){
    res.status(400).json(error.message);
    console.log(error)}
})


//---------------------------todo------------------------------------

app.get('/todos',async (req,res)=> {
  try{
    //obtener como resultado todos los usuarios de la base de datos
    const result=await Todos.findAll(
    );
    res.status(200).json(result);
  } catch(error){console.log(error)}
});

app.get('/todos/:id', async(req,res)=>{
  try{
    const {id}= req.params;
    const result= await Todos.findOne({
      where: {id},
    });
    res.status(200).json(result);
  } catch(error) {
    console.log(error);
  }
});

app.post('/todos', async(req,res)=>{
  try{
    const newTask= req.body;
    const result= await Todos.create(newTask);
    res.status(201).json(result);
  }catch(error) {
    res.status(400).json(error.message);
        console.log(error)
  }
});

app.put('/todos/:id', async(req,res)=>{
  try{
    const {id}= req.params;
    const data= req.body;
    const result= await Todos.update(data,{
      where: {id}
    })
    res.status(200).json(result);
  }catch(error) {
    res.status(400).json(error.message);
        console.log(error);
  }
});

app.delete('/todos/:id', async(req,res)=>{
  try{
    const {id}= req.params;
    const result= await Todos.destroy({
      where:{id}
    });
    res.status(200).json(result);
  }catch (error){
    res.status(400).json(error.message);
    console.log(error)}
});


app.listen (PORT, ()=> {
  console.log(`servidor corriendo en el puerto  ${PORT}`)
} );