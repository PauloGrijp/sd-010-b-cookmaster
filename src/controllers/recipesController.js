const express = require('express');
const rescue = require('express-rescue');
const { createServiceRecipes } = require('../services/recipesService');
const { validateRecipes, validateToken } = require('../middlewares/validateRecipes');
// const { getUser } = require('../models/userModel');

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

module.exports = routerRecipes;
