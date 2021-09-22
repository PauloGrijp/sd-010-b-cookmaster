const express = require('express');
const RecipesController = require('../controllers/Recipes');
const Auth = require('../auth/tokenValidator');

const Router = express.Router();

Router.post('/recipes', Auth.tokenValidator, RecipesController.createRecipe);

module.exports = Router;
