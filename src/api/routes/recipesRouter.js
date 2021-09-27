const express = require('express');
const rescue = require('express-rescue');

const recipesController = require('../controllers/recipesController');
const { validFile, upload, createFileImg } = require('../controllers/multerController');

const recipesRouter = express.Router();

recipesRouter.post('/', rescue(recipesController.addRecipes));

recipesRouter.get('/', rescue(recipesController.getRecipeByAll));
recipesRouter.get('/:id', rescue(recipesController.getRecipeById));

recipesRouter.put('/:id/image', rescue(validFile), upload.single('image'), createFileImg);
recipesRouter.put('/:id', rescue(recipesController.editRecipes));

recipesRouter.delete('/:id', rescue(recipesController.deleteRecipes));

module.exports = recipesRouter;