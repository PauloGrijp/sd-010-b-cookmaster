const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const validateToken = require('./auth/validateJWT');
const usersController = require('../../controllers/usersController');
const recipesController = require('../../controllers/recipesController');

const app = express();

const storage = multer.diskStorage({
  destination: (_req, _file, callbak) => {
    callbak(null, 'uploads/');
  },
  filename: (req, _file, callbak) => {
    const { id } = req.params;
    console.log(id);
    callbak(null, `${id}.jpeg`);
  },
});

const upload = multer(storage);

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app
  .route('/users')
  .post(usersController.createUser);

app
  .route('/login')
  .post(usersController.login);

app
  .route('/recipes/:id/image/')
  .put(validateToken, upload.single('image'), recipesController.updateImg);

app
  .route('/recipes/:id')
  .get(recipesController.getById)
  .put(validateToken, recipesController.updateRecipe)
  .delete(validateToken, recipesController.deleteRecipe);

app
  .route('/recipes')
  .get(recipesController.getRecipes)
  .post(validateToken, recipesController.createRecipe);

module.exports = app;
