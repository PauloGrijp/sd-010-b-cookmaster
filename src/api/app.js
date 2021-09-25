const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const users = require('../controllers/userController');
const login = require('../controllers/loginController');
const recipes = require('../controllers/recipesController');

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', users);
app.use('/login', login);
app.use('/recipes', recipes);
app.use('/images', express.static(`${__dirname}/../uploads`));

module.exports = app;
