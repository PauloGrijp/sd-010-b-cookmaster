const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const upload = require('../utils/multer');
const usersController = require('../controllers/usersControllers');
const recipesController = require('../controllers/recipesController');
const AppError = require('../utils/appError');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersController.create);
app.post('/login', usersController.login);

app.use(express.static(path.join(__dirname, '..', 'uploads')));
app.post('/recipes', recipesController.create);
app.get('/recipes', recipesController.getAll);
app.get('/recipes/:id', recipesController.getById);
app.put('/recipes/:id/image', recipesController.validateUser, 
  upload.single('image'), recipesController.addImage, recipesController.getById);
app.put('/recipes/:id', recipesController.updateId);
app.delete('/recipes/:id', recipesController.deleteId);

app.use((err, _req, res, _next) => {
  if (err instanceof AppError) {
    const { code, message } = err;
    return res.status(code).json({ message });
  }
  return res.status(err.status).json({ message: err.message });
});

module.exports = app;
