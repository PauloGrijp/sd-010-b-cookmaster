const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const { 
  createUsers, 
  login, 
  createRecipes, 
  allRecipes, 
  recipeById,
  editRecipe,
  deleteRecipe,
  uploadImage,
} = require('../controllers');

const { 
  userValidation, 
  validateEmail,
  userLogin, 
  validatePwd, 
  dataValidation,
  isValidRecipe,
} = require('../services');

const validateJWT = require('./auth/validateJWT');

const app = express();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/image', express.static(path.join(__dirname, '..', 'uploads')));
// console.log(path);
const apiRoutes = express.Router();
apiRoutes.post('/users', userValidation, validateEmail, createUsers)
.post('/login', userLogin, validatePwd, login)
.post('/recipes', dataValidation, validateJWT, createRecipes)
.get('/recipes', allRecipes)
.get('/recipes/:id', isValidRecipe, recipeById)
.put('/recipes/:id', validateJWT, isValidRecipe, editRecipe)
.delete('/recipes/:id', validateJWT, deleteRecipe)
.put('/recipes/:id/image', validateJWT, upload.single('image'), uploadImage);

app.use(apiRoutes);
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
