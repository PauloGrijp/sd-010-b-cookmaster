const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('../middlewares/error');
const validateJWT = require('./auth/validateJWT');
const User = require('../controllers/User');
const Recipe = require('../controllers/Recipe');
const Login = require('../controllers/Login');

const app = express();

app.use(bodyParser.json());

app.post('/login', Login);

// app.get('/users', User.getAll);
// app.get('/products/:id', User.findById);
app.post('/users', User.create);
// app.put('/products/:id', User.update);
// app.delete('/products/:id', User.remove);

app.get('/recipes', Recipe.getAll);
// app.get('/sales/:id', Sale.findById);
app.post('/recipes', validateJWT, Recipe.create);
// app.put('/sales/:id', Sale.update);
// app.delete('/sales/:id', Sale.remove);

app.use(errorMiddleware);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
