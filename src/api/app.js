const multer = require('multer');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipeController = require('../controllers/recipeController');
const { jwtValidation } = require('../middlewares/jwtValidation');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, './src/uploads');
  },

  filename: (req, _file, callback) => {
    const { id } = req.params;
    const fileExtension = `${id}.jpeg`;
    callback(null, fileExtension);
  },
});

const upload = multer({ storage });

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.post('/users', userController.userCreate); // req 1

app.post('/login', loginController.userLogin); // req 2

app.post('/recipes', jwtValidation, recipeController.registerRecipe); // req 3

app.get('/recipes', recipeController.findAllRecipes); // req 4

app.get('/recipes/:id', recipeController.findRecipeById); // req 5

app.put('/recipes/:id', jwtValidation, recipeController.editRecipe); // req 7

app.delete('/recipes/:id', jwtValidation, recipeController.delRecipe); // req 8

app.put('/recipes/:id/image/', jwtValidation, upload.single('image'), recipeController.imgUpload); // req 9

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;
