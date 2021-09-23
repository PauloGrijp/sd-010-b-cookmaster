const express = require('express');
const { validateJWT } = require('../../middlewares/jwtMiddlewares');
const { checkValues } = require('../../middlewares/recipesMiddlewares');

const recipesController = require('../../controllers/recipesController');

const router = express.Router();

router.get('/:id', recipesController.getRecipeById);

router.get('/', recipesController.getAllRecipes);

router.post('/', validateJWT, checkValues, recipesController.addRecipe);

module.exports = router;
