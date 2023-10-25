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
    const todos = await database.getAllTodos();
    res.render('todo-list', { todos: todos });
  } catch (error) {
    res.status(500).send('Error fetching todo list');
  }
});


// Add a new todo item
router.post('/todos', async (req, res) => {
  try {
    const { content } = req.body;
    await database.createTodo(content);
    res.redirect('/todos');
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
    await database.updateTodo(todoId, content);
    res.redirect('/todos');
  } catch (error) {
    res.status(500).send('Error updating todo item');
  }
});

// Delete a todo item
router.post('/todos/:id/delete', async (req, res) => {
  try {
    const todoId = req.params.id;
    await database.deleteTodo(todoId);
    res.redirect('/todos');
  } catch (error) {
    res.status(500).send('Error deleting todo item');
  }
});

module.exports = router;