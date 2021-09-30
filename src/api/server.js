const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
// CONTROLLERS
const logIn = require('../controllers/login.controllers');
const { newUser } = require('../controllers/user.controllers');
const {
  newRecipe,
  getRecipeById,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  insertImage,
} = require('../controllers/recipe.controllers');
// MIDDLEWARES
const {
  isValidEmail,
  isValidNameAndPassword,
  validateLogin,
} = require('../middlewares/user.middlewares');
const {
  isValidFields, checkRole,
} = require('../middlewares/recipe.middlewares');

const validateJWT = require('../auth/validateJWT');
const upload = require('../middlewares/upload.middlewares');

app.use(bodyParser.json());
app.use('/images', express.static('src/uploads'));

app.post(
  '/users',
  isValidNameAndPassword,
  isValidEmail,
  newUser,
);

app.post(
  '/login',
  validateLogin,
  logIn,
);

app.post(
  '/recipes',
  validateJWT,
  isValidFields,
  newRecipe,
);

app.get('/recipes/:id', getRecipeById);

app.get('/recipes', getAllRecipes);

app.put(
  '/recipes/:id',
  validateJWT,
  checkRole,
  updateRecipe,
);

app.delete(
  '/recipes/:id',
  validateJWT,
  checkRole,
  deleteRecipe,
);

app.put(
  '/recipes/:id/image',
  validateJWT,
  checkRole,
  upload,
  insertImage,
  );

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
