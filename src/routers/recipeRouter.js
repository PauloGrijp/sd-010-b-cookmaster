const express = require('express');
const { recipeController } = require('../controllers');
const { authJWT, authRecipe } = require('../middlewares');

const router = express.Router();

router.post('/', authJWT, authRecipe.checkInformations, recipeController.createRecipe);

router.get('/:id', authRecipe.mongoValid, recipeController.getRecipeById);

router.get('/', recipeController.getRecipes);

router.put('/:id',
  authRecipe.mongoValid,
  authRecipe.checkAuthentication,
  authJWT,
  recipeController.updateRecipe);

router.delete('/:id',
  authRecipe.mongoValid,
  authRecipe.checkAuthentication,
  authJWT,
  recipeController.deleteRecipe);

module.exports = router;
