const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');
const {
  validateEmail,
  validateFields,
  emailExists,
  validateRecipe,
} = require('../middlewares/validations');
const { validToken } = require('../middlewares/validateJWT');

const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
  mimetype: (req, file, callback) => {
    callback(null, 'image/jpeg');
  },
});

const upload = multer({ storage });

app.get('/recipes', recipesController.getAllRecipes);
app.get('/recipes/:id', recipesController.getRecipeById);

app.post('/users',
  validateFields,
  validateEmail,
  emailExists,
  usersController.createUser);
app.post('/login', usersController.userLogin);
app.post('/recipes', validToken, validateRecipe, recipesController.createRecipe);

app.put('/recipes/:id', validToken, validateRecipe, recipesController.updateRecipe);

app.delete('/recipes/:id', validToken, recipesController.deleteRecipe);

app.put('/recipes/:id/image/', validToken, upload.single('image'), recipesController.updateImg);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
