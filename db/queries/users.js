const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserWithEmail = function (email) {
  return db
    .query(`SELECT * FROM users WHERE email = $1 LIMIT 1;`, [email])
    .then((result) => {
      if (result.rows[0] === undefined) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addUser = function (user) {
  return db
    .query(`INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getUsers, getUserWithEmail, addUser };
