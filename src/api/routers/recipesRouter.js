const express = require('express');
const rescue = require('express-rescue');
const upload = require('../middlewares');

const recipesController = require('../controllers/recipesController');

const recipesRouter = express.Router();

recipesRouter.get('/', rescue(recipesController.getAllRecipes));
recipesRouter.get('/:id', rescue(recipesController.getRecipeById));
recipesRouter.put('/:id', rescue(recipesController.updateRecipe));
recipesRouter.put('/:id', rescue(recipesController.updateRecipe));
recipesRouter.put('/:id/image/', upload.single('image'), rescue(recipesController.addRecipeImage));
recipesRouter.delete('/:id', rescue(recipesController.deleteRecipe));
recipesRouter.post('/', rescue(recipesController.createRecipe));

module.exports = recipesRouter;
