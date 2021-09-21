const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('../controllers/usersControllers');

const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

// USERS
app.post('/users', UsersController.registerUsers);
app.post('/login', UsersController.loginUser);

module.exports = app;
