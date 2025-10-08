const express = require('express'); 
const createTodo = require('../../controllers/todoControllers/create');
const authMiddlewere = require('../../middleweres/authMiddlewere');
const upload = require('../../helpers/imageUploader');
const getAllTodo = require('../../controllers/todoControllers/getAll');
const updateTodo = require('../../controllers/todoControllers/update');
const deleteTodo = require('../../controllers/todoControllers/delete');
const todoAPI = express.Router();

 

todoAPI.post('/create' , authMiddlewere , upload.single('image')  , createTodo)  // create todo 


todoAPI.get('/getall' , authMiddlewere ,  getAllTodo)  // get all todo


todoAPI.put('/update/:id' , authMiddlewere , upload.single('image')  ,  updateTodo)  // get all todo


todoAPI.delete('/delete/:id' , authMiddlewere ,  deleteTodo)  // get all todo




module.exports = todoAPI