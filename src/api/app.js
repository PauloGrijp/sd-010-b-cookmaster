const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../controllers/user');
const validateUserCreation = require('../middlewares/validateUserCreation');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

apiRoutes.post('/users', validateUserCreation, userController.createUser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(apiRoutes);

module.exports = app;
