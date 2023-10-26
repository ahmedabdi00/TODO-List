const db = require('../connection');

const checkList = function (id, check) {
  return db
    .query(`UPDATE items SET checked = $1 WHERE id = $2 RETURNING *;`, [check, id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const createTodo = function (content, userId, priorityId, cateogryId) {
  return db
    .query(`INSERT INTO items (content, user_id, priority_id, category_id) VALUES ($1, $2, $3, $4) RETURNING *;`, [content, userId, priorityId, cateogryId])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const updateTodo = function (todoId, content, categoryId, priorityId) {
  return db
    .query(`UPDATE items SET content = $1, category_id = $3, priority_id = $4 WHERE id = $2 RETURNING *;`, [content, todoId, categoryId, priorityId])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getAllTodosForUser = function (userId) {
  return db
    .query(`SELECT * FROM items WHERE user_id = $1;`, [userId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getAllTodosForUserAndCategory = function (userId, categoryId) {
  return db
    .query(`SELECT * FROM items WHERE user_id = $1 AND category_id = $2 RETURNING *;`, [userId, categoryId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const deleteTodo = function (todoId) {
  return db
    .query(`DELETE FROM items WHERE id = $1 RETURNING *;`, [todoId])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getTodoById = function (todoId) {
  return db
    .query(`SELECT * FROM items WHERE id = $1;`, [todoId])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};

module.exports = { checkList, createTodo, updateTodo, getAllTodosForUser, deleteTodo, getTodoById };
