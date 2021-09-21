const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('../controllers/usersControllers');

const app = express();

app.use(bodyParser.json());

// USERS

app.get('/', (request, response) => {
  response.send();
});

app.post('/users', UsersController.registerUsers);

module.exports = app;
