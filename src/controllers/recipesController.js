const express = require('express');
const rescue = require('express-rescue');
const { createServiceRecipes, getAllRecipes } = require('../services/recipesService');
const { validateRecipes, validateToken } = require('../middlewares/validateRecipes');

const routerRecipes = express.Router();

routerRecipes.post('/', validateToken, validateRecipes, rescue(async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;

  const result = await createServiceRecipes(name, ingredients, preparation);

  const { _id } = req.userId;

  const newRecipes = {
    name,
    ingredients,
    preparation,
    userId: _id,
    _id: result.insertedId,
  };

  return res.status(201).json({ recipe: newRecipes });
}));

routerRecipes.get('/', async (_req, res, _next) => {
  const recipes = await getAllRecipes();

  return res.status(200).json(recipes);
});

module.exports = routerRecipes;
