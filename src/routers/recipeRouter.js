const express = require('express');
const { recipeController } = require('../controllers');
const { authJWT, authRecipe } = require('../middlewares');

const router = express.Router();

router.post('/', authJWT, authRecipe.checkInformations, recipeController.createRecipe);
router.get('/:id', recipeController.getRecipeById);
router.get('/', recipeController.getRecipes);
router.put('/:id', authRecipe.checkAuthentication, authJWT, recipeController.updateRecipe);

module.exports = router;
