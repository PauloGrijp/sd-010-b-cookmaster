const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/usersController');
const {
  validateEmail,
  validateFields,
  emailExists,
} = require('../middlewares/validations');

const app = express();

app.use(bodyParser.json());

app.post('/users',
  validateFields,
  validateEmail,
  emailExists,
  controller.createUser);
app.post('/login', controller.userLogin);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
