const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');
const RecipeController = require('../controllers/RecipeController');
 const validationJWT = require('../middlewares/validationJWT');

const app = express();

app.use(bodyParser.json());
/* Adicionado de acordo com o readme
// ./src/api/app.js

const path = require('path');
// ...

// /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload
// a pasta `uploads` está em `./src/uploads` e não deve ser renomeada ou removida (assim como o arquivo `ratinho.jpg`)
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// ...
 */

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (_req, res) => {
  res.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.post('/users', UserController.createUser);
app.post('/login', LoginController.findUser);
app.post('/recipes', validationJWT, RecipeController.createRecipe);

module.exports = app;
