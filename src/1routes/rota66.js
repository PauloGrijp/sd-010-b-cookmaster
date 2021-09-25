const express = require('express');
const {
  createRecipes,
  getRecipes,
  getRecipesID,
  putRecipesID,
  deleteRecipesID } = require('../2controller/recipesController');
const { createUsers, login } = require('../2controller/usersController');

const rota = express.Router();

rota.post('/users', createUsers);
rota.post('/login', login);
rota.post('/recipes', createRecipes);
rota.get('/recipes/:id', getRecipesID);
rota.put('/recipes/:id', putRecipesID);
rota.delete('/recipes/:id', deleteRecipesID);
rota.get('/recipes', getRecipes);

module.exports = rota;