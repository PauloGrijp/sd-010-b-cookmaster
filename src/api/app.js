const express = require('express');

const { Users, Login, Recipes } = require('./routes');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', Users);
app.use('/login', Login);
app.use('/recipes', Recipes);

module.exports = app;
