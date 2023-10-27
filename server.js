// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session");

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const listRoutes = require('./routes/list');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/list', listRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  if (req.session.userId === undefined) {
    res.render('login');
  } else {
    res.render('index');
  }
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/users/register', (req, res) => {
  res.render('register');
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

app.post('/list/todos/:taskId/check', (req, res) => {
  const taskId = req.params.taskId;
  const isChecked = req.body.check; 

  database.checkList(taskId, isChecked)
    .then((result) => {
      res.status(200).send('Task status updated successfully');
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send('Error updating task status');
    });
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
