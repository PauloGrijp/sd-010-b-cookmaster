const express = require('express');

const app = express();
app.use(express.json());

const { usersRoute, loginRoute } = require('./routes');

app.get('/', (_request, response) => {
  response.send();
});

app.use('/users', usersRoute);
app.use('/login', loginRoute);

module.exports = app;
