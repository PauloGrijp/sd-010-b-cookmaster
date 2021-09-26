const express = require('express');

const { validatedToken, validatedApi } = require('../middleware/validatedToken');
const createRecipes = require('../service/recipesService');

const routerRecipes = express.Router();

routerRecipes.post('/', validatedToken, validatedApi, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const result = await createRecipes(req.body);
  const { _id } = req.userId;
  console.log(result.insertedId);
  const recipe = {
    name,
    ingredients,
    preparation,
    userId: _id,
    _id: result.insertedId,
  };
  return res.status(201).json({ recipe });
});

module.exports = routerRecipes;
