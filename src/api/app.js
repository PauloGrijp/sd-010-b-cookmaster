const express = require('express');
const bodyParser = require('body-parser');
const { getPosts, createUsers, login } = require('./routes');
const { userValidation, validateEmail, userLogin, validatePwd } = require('../midlewares/index');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();
apiRoutes.get('/posts', getPosts);
apiRoutes.post('/users', userValidation, validateEmail, createUsers);
apiRoutes.post('/login', userLogin, validatePwd, login);

app.use(apiRoutes);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
