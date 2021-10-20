const express = require('express');
const path = require('path');

const {
  loginRoutes,
  usersRoutes,
  recipesRoutes,
} = require('../routes');

const error = require('../middlewares/error');

const app = express();

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/users', usersRoutes);
app.use('/recipes', recipesRoutes);
app.use('/images', express.static(path.join(__dirname, '../uploads')));

app.get('/', (request, response) => {
  response.send();
});

app.use(error);

module.exports = app;
