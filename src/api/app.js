const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const { authValidation } = require('../auth/authMiddleware');

const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipeController');

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.route('/users')
  .post(userController.createUser);

app.route('/login')
  .post(loginController.login);

app.route('/recipes')
  .post(authValidation, recipeController.create)
  .get(recipeController.getAll);

app.route('/recipes/:id')
  .get(recipeController.getById)
  .put(authValidation, recipeController.update)
  .delete(authValidation, recipeController.exclude);

app.route('/recipes/:id/image/')
  .put(authValidation, upload.single('image'), recipeController.addImage);

module.exports = app;
