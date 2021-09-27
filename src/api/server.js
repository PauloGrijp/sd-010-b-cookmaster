const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
const userMiddlewares = require('../../middlewares/userMiddleware');
const recipeMiddlewares = require('../../middlewares/recipeMiddlewares');
const userController = require('../../controllers/userController');
const recipeController = require('../../controllers/recipeController');
const login = require('../../controllers/login');
const validateJWT = require('../../auth/validateJWT');
const upload = require('../../middlewares/uploadImage');

app.use(bodyParser.json());

app.use('/images', express.static('src/uploads'));

app.get('/recipes/:id', recipeController.getRecipeById);

app.get('/recipes', recipeController.getAllRecipes);

app.post(
  '/users',
  userMiddlewares.validateNameAndPassword,
  userMiddlewares.validateEmail,
  userController.createUser,
);

app.post(
  '/login',
  userMiddlewares.validateLogin,
  login,
);

app.post(
  '/recipes',
  validateJWT,
  recipeMiddlewares.validateFields,
  recipeController.createRecipe,
);

app.put(
  '/recipes/:id/image',
  validateJWT,
  recipeMiddlewares.validationIsUserOrAdmin,
  upload,
  recipeController.insertImage,
  );

app.put(
  '/recipes/:id',
  validateJWT,
  recipeMiddlewares.validationIsUserOrAdmin,
  recipeController.updateRecipe,
);

app.delete(
  '/recipes/:id',
  validateJWT,
  recipeMiddlewares.validationIsUserOrAdmin,
  recipeController.deleteRecipe,
);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
