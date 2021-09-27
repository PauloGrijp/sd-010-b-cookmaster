const express = require('express');

const JWTValidation = require('../middlewares/JWTValidation');
const recipesController = require('../controllers/recipesController');

const route = express.Router();

route.post('/', JWTValidation, recipesController.createRecipe);

module.exports = route;