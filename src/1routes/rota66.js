const express = require('express');
const {
  createRecipes,
  getRecipes,
  getRecipesID,
  putRecipesID,
  deleteRecipesID, 
  putImage} = require('../2controller/recipesController');
const { createUsers, login } = require('../2controller/usersController');
const { imageMulter } = require('../5middleware/multer');

const rota = express.Router();

rota.post('/users', createUsers);
rota.post('/login', login);
rota.post('/recipes', createRecipes);
rota.get('/recipes/:id', getRecipesID);
rota.put('/recipes/:id', putRecipesID);
rota.delete('/recipes/:id', deleteRecipesID);
rota.put('/recipes/:id/image', imageMulter.single('image'), putImage);
rota.get('/recipes', getRecipes);

module.exports = rota;