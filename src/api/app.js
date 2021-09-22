const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const { createUser, login } = require('../controllers/userController');
const { createRecipe, getAllRecipes, findRecipe, updateRecipe, 
  addImage, deleteRecipe, errorImage } = require('../controllers/recipesController');

const { isValidUser } = require('../middlewares/userMiddleware');
const { isValidLogin } = require('../middlewares/loginMiddleware');
const { isValidRecipe, existsRecipe } = require('../middlewares/recipeMiddleware');

const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, call) => call(null, path.resolve(__dirname, '..', 'uploads')),
  filename: (req, file, call) => call(null, `${req.params.id}.jpeg`),
});

// const fileFilter = (req, file, call) => {
//   if (!file.originalname.match(/\.(jpeg)$/)) {
//     call(new Error('Please upload an image JPEG.'), false);
//   } else {
//     call(undefined, true);
//   }
// };

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', isValidUser, createUser);

app.post('/login', isValidLogin, login);

app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', existsRecipe, findRecipe);
app.put('/recipes/:id', validateJWT, isValidRecipe, existsRecipe, updateRecipe);
app.put('/recipes/:id/image', validateJWT, upload.single('image'), addImage, errorImage);
app.post('/recipes', validateJWT, isValidRecipe, createRecipe);
app.post('/recipes', validateJWT, isValidRecipe, createRecipe);
app.delete('/recipes/:id', validateJWT, deleteRecipe);

module.exports = app;
