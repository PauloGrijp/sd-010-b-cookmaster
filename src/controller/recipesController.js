const express = require('express');
const rescue = require('express-rescue');
const { validatedToken, validatedApi } = require('../middleware/validatedToken');
const { createRecipes, getAll, getById } = require('../service/recipesService');

const routerRecipes = express.Router();

routerRecipes.post('/', validatedToken, validatedApi, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const result = await createRecipes(req.body);
  const { _id } = req.userId;
  const recipe = {
    name,
    ingredients,
    preparation,
    userId: _id,
    _id: result.insertedId,
  };
  return res.status(201).json({ recipe });
});

routerRecipes.get('/', rescue(async (_req, res) => {
  const resultGetAll = await getAll();
  return res.status(200).json(resultGetAll);
}));

routerRecipes.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const resultGetById = await getById(id); 
  if (resultGetById.isError) return next(resultGetById);
  return res.status(200).json(resultGetById);
}));

routerRecipes.put('/:id', async (_req, _res) => {

});

routerRecipes.delete('/id', async (_req, _res) => {

});

module.exports = routerRecipes;
