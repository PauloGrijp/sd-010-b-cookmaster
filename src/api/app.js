const express = require('express');

const { Users, Login } = require('./routes');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', Users);
app.use('/login', Login);

module.exports = app;
