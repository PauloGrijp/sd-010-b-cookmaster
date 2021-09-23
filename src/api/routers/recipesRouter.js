const express = require('express');
const { validateJWT } = require('../../middlewares/jwtMiddlewares');
const { checkValues } = require('../../middlewares/recipesMiddlewares');

const recipesController = require('../../controllers/recipesController');

const router = express.Router();

router.put('/:id', validateJWT, recipesController.updateRecipe);

router.post('/', validateJWT, checkValues, recipesController.addRecipe);

router.get('/:id', recipesController.getRecipeById);

router.get('/', recipesController.getAllRecipes);

module.exports = router;
