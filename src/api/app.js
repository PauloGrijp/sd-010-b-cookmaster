const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const users = require('../controllers/userController');

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

const { userValidate } = require('../middlewares/userMiddlewares');

app.use('/users', userValidate, users);
// app.use(loginRouter);

module.exports = app;
