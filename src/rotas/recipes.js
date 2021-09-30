const express = require('express');
const { validateRecipes, validateId } = require('../midd/validate');
const veriToken = require('../midd/veriToken');
const Recipes = require('../controllers/recipes');
const upload = require('../midd/multer');

const RecipeRouter = express.Router();

RecipeRouter.post('/', validateRecipes, veriToken, Recipes.createRecipe);
RecipeRouter.get('/', Recipes.getAll);

RecipeRouter.get('/:id', validateId, Recipes.getRecipe);
RecipeRouter.put('/:id', veriToken, Recipes.editRecipe);
RecipeRouter.put('/:id/image', veriToken, upload.single('image'), Recipes.addImage);

RecipeRouter.delete('/:id', veriToken, Recipes.deleteRecipe);

module.exports = RecipeRouter;
