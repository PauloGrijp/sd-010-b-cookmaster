const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const usersController = require('../controllers/UsersController');
const loginController = require('../controllers/LoginController');
const recipesController = require('../controllers/RecipesController');
const middleware = require('../middlewares/validateToken');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    console.log(file);
    const arr = file.mimetype.split('/');
    callback(null, `${id}.${arr[1]}`);
  },
});

const app = express();
app.use(bodyParser.json());

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.addNewUser);

app.post('/login', loginController.goLogin);

app.post('/recipes', recipesController.addNewRecipe);

app.get('/recipes/:id', recipesController.getRecipeById);

app.get('/recipes', recipesController.getAllRecipes);

app.put('/recipes/:id/image', middleware,
upload.single('image'), recipesController.addImageToRecipe);

app.put('/recipes/:id', recipesController.updateRecipe);

app.delete('/recipes/:id', recipesController.deleteRecipe);

module.exports = app;
