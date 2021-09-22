const express = require('express');
const rescue = require('express-rescue');

const recipesController = require('../controllers/recipesController');

const recipesRouter = express.Router();

recipesRouter.post('/', rescue(recipesController.createRecipe));

module.exports = recipesRouter;
