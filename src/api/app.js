const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../../controller/userController');
const auth = require('../../service/auth');

const app = express();

app.use(bodyParser.json());

app.post('/users', userController.userRegister);
app.post('/login', userController.userLogin);
app.post('/recipes', auth.validadeLogin, userController.userCreateRecipes);
app.get('/recipes/:id', userController.getOneRecipe);
app.get('/recipes', userController.getAllRecipes);
app.put('/recipes/:id', auth.validadeLogin, userController.editOneRecipe);
app.delete('/recipes/:id', auth.validadeLogin, userController.deleteOneRecipe);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador
app.use((err, req, res, _next) => {
  if (!err.status) {  
    return res.status(401).json(err.message);
  }
  res.status(err.status).json({ message: err.message });
});

module.exports = app;