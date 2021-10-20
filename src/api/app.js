const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { error } = require('../middlewares');
const {
  loginRoutes,
  usersRoutes,
  recipesRoutes,
} = require('../routes');

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.route(bodyParser.urlencoded({ extended: true }));

app.use('/login', loginRoutes);
app.use('/users', usersRoutes);
app.use('/recipes', recipesRoutes);
app.use('/images', express.static(path.join(__dirname, '../uploads')));

app.use(error);

app.get('/', (request, response) => {
  response.send();
});

module.exports = app;
