const express = require('express');
const bodyParser = require('body-parser');
const { createAction } = require('../controller/createUser');
const { userCheck } = require('../middlewares/userValidation');

const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.post('/users', userCheck, createAction);

module.exports = app;
