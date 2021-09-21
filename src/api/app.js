const express = require('express');
const { errorMiddleware } = require('../middlewares');
const users = require('../controllers/Users');
const login = require('../controllers/Login');
const recipe = require('../controllers/Recipes');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(`${__dirname}/../uploads`));
app.use('/login', login);
app.use('/users', users);
app.use('/recipes', recipe);

app.use(errorMiddleware);

module.exports = app;
