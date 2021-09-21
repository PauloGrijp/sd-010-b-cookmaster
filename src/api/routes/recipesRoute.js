const express = require('express');

const controllersRecipes = require('../../controllers/recipes');

const middlewares = require('../../middlewares/index');

const router = express.Router();

router.post('/', middlewares.validateJWT, controllersRecipes.createRecipe);

router.get('/', controllersRecipes.getAllRecipes);

router.get('/:id', controllersRecipes.getRecipeById);

router.put('/:id', middlewares.validateJWT, controllersRecipes.editRecipe);

router.delete('/:id', middlewares.validateJWT, controllersRecipes.deleteRecipe);
router.put('/:id/image',
middlewares.validateJWT,
middlewares.uploadImage,
controllersRecipes.addImageToRecipe);

module.exports = router;