const express = require('express');
const rescue = require('express-rescue');
const recipesController = require('../controllers/recipesController');
// const multerUploadController = require('../controllers/multerController');

const recipesRouter = express.Router();

recipesRouter.post('/', rescue(recipesController.addRecipes));

recipesRouter.get('/:id', rescue(recipesController.getRecipeById));
recipesRouter.get('/', rescue(recipesController.getRecipeByAll));

module.exports = recipesRouter;