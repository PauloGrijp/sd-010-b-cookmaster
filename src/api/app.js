const express = require('express');

const Users = require('./routes/Users');

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/users', Users);

module.exports = app;
