const express = require('express');
const router = express.Router();
const database = require("../db/queries/list");

// Check item off todo list
router.post("/check", async (req, res) => {
  try {
    const check = req.body.check;
    const id = req.body.id;
    await database.checkList(id, check); // Wait for the database operation to complete
    res.status(200).send('Todo item checked successfully'); // Respond to the client
  } catch (error) {
    res.status(500).send('Error checking todo item');
  }
});

// Display the todo list
router.get('/todos', async (req, res) => {
  try {
    const todos = await database.getAllTodosForUser(req.session.userId);
    res.send(todos);
  } catch (error) {
    res.status(500).send('Error fetching todo list');
  }
});

router.get('/todos/order', async (req, res) => {
  console.log('1');
  try {
    const todos = await database.getAllTodosForUserOrderByPriority(req.session.userId);
    res.send(todos);
  } catch (error) {
    res.status(500).send('Error fetching todo list');
  }
});


// Add a new todo item
router.post('/todos', async (req, res) => {
  try {
    const id = req.session.userId;
    const content = req.body.content;
    const categoryId = req.body.category;
    const priorityId = req.body.priority;
    await database.createTodo(content, id, priorityId, categoryId);
    
  } catch (error) {
    res.status(500).send('Error creating todo item');
  }
});

// Edit a todo item
router.get('/todos/:id/edit', async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await database.getTodoById(todoId);
    res.render('edit-todo', { todo: todo });
  } catch (error) {
    res.status(500).send('Error fetching todo item for editing');
  }
});

// Update a todo item
router.post('/todos/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    const { content } = req.body;
    await database.updateTodo(todoId, content, priorityId, categoryId);
    res.redirect('/list/todos');
  } catch (error) {
    res.status(500).send('Error updating todo item');
  }
});

// Delete a todo item
router.post('/todos/:id/delete', async (req, res) => {
  try {
    const todoId = req.params.id;
    await database.deleteTodo(todoId);
    res.redirect('/list/todos');
  } catch (error) {
    res.status(500).send('Error deleting todo item');
  }
});

module.exports = router;
