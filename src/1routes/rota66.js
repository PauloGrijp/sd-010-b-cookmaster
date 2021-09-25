const express = require('express');
const { createRecipes, getRecipes, getRecipesID } = require('../2controller/recipesController');
const { createUsers, login } = require('../2controller/usersController');

const rota = express.Router();

rota.post('/users', createUsers);
rota.post('/login', login);
rota.post('/recipes', createRecipes);
rota.get('/recipes/:id', getRecipesID);
rota.get('/recipes', getRecipes);

module.exports = rota;