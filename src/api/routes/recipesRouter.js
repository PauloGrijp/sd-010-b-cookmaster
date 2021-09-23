const express = require('express');
const rescue = require('express-rescue');
const recipesController = require('../controllers/recipesController');
// const multerUploadController = require('../controllers/multerController');

const recipesRouter = express.Router();

recipesRouter.post('/', rescue(recipesController.addRecipes));

recipesRouter.get('/', rescue(recipesController.getRecipeByAll));
recipesRouter.get('/:id', rescue(recipesController.getRecipeById));

module.exports = recipesRouter;