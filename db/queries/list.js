const db = require('../connection');

const checkList = function (id, check) {
  return db
    .query(`UPDATE lists SET checked = $1 WHERE id = $2 RETURNING *;`, [check, id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const createTodo = function (content) {
  return db
    .query(`INSERT INTO lists (content) VALUES ($1) RETURNING *;`, [content])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const updateTodo = function (todoId, content) {
  return db
    .query(`UPDATE lists SET content = $1 WHERE id = $2 RETURNING *;`, [content, todoId])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getAllTodosForUser = function (userId) {
  return db
    .query(`SELECT * FROM lists WHERE user_id = $1;`, [userId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const deleteTodo = function (todoId) {
  return db
    .query(`DELETE FROM lists WHERE id = $1 RETURNING *;`, [todoId])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getTodoById = function (todoId) {
  return db
    .query(`SELECT * FROM lists WHERE id = $1;`, [todoId])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};

module.exports = { checkList, createTodo, updateTodo, getAllTodosForUser, deleteTodo, getTodoById };