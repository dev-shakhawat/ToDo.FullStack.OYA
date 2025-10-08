const express = require('express'); 
const createTodo = require('../../controllers/todoControllers/create');
const authMiddlewere = require('../../middleweres/authMiddlewere');
const upload = require('../../helpers/imageUploader');
const getAllTodo = require('../../controllers/todoControllers/getAll');
const updateTodo = require('../../controllers/todoControllers/update');
const deleteTodo = require('../../controllers/todoControllers/delete');
const todoAPI = express.Router();

 
/**
 * @swagger
 * tags:
 *   - name: Todo
 *     description: Todo Task Management
 */




/**
 * @swagger
 * /todo/create:
 *   post:
 *     summary: Create a new todo task
 *     description: Create a new todo with optional media file. Requires Bearer token authentication.
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The todo text
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Optional media file
 *     responses:
 *       200:
 *         description: Todo created successfully
 *       400:
 *         description: Something went wrong
 */

todoAPI.post('/create' , authMiddlewere , upload.single('media')  , createTodo)  // create todo 



/**
 * @swagger
 * /todo/getall:
 *   get:
 *     summary: get all todo task
 *     description: using this api you can get all todo task. Requires Bearer token authentication.
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Todo fetched successfully
 *       400:
 *         description: Something went wrong
 */
todoAPI.get('/getall' , authMiddlewere ,  getAllTodo)  // get all todo


/**
 * @swagger
 * /todo//update/{id}:
 *   put:
 *     summary: update todo task
 *     description: using this api you can update todo task. Requires Bearer token authentication.
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Optional media file
 *     responses:
 *       200:
 *         description: Updated successfully
 *       400:
 *         description: Something went wrong
 */
todoAPI.put('/update/:id' , authMiddlewere , upload.single('image')  ,  updateTodo)  // get all todo



/**
 * @swagger
 * /todo/delete/{id}:
 *   delete:
 *     summary: delete todo task
 *     description: using this api you can delete todo task. Requires Bearer token authentication.
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       400:
 *         description: Something went wrong
 */
todoAPI.delete('/delete/:id' , authMiddlewere ,  deleteTodo)  // get all todo




module.exports = todoAPI