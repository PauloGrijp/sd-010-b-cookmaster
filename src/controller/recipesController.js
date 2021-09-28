const express = require('express');
const rescue = require('express-rescue');
const { validatedToken, validatedApi } = require('../middleware/validatedToken');
const { createRecipes,
  getAll, getById, updateOne, deleteOne, createImg } = require('../service/recipesService');
const file = require('../middleware/updateOne');

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
  console.log(resultGetAll);
  return res.status(200).json(resultGetAll);
}));

routerRecipes.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const resultGetById = await getById(id); 
  if (resultGetById.isError) return next(resultGetById);
  return res.status(200).json(resultGetById);
}));

routerRecipes.put('/:id', validatedToken, validatedApi, async (req, res) => {
  const { id } = req.params;
  const result = await updateOne(id, req.body);
  const { _id } = req.userId;
  const aoba = {
    ...result,
    userId: _id, 
  };
  return res.status(200).json(aoba);
});

routerRecipes.delete('/:id', validatedToken, async (req, res) => {
  const { id } = req.params;
  await deleteOne(id);
  return res.status(204).json();
});

routerRecipes.put('/:id/image/',
  validatedToken, file.single('image'),
  rescue(async (req, res) => {
  const { id } = req.params;
  const aux = await createImg(id);
  const { _id } = req.userId;
  const aoba = {
    ...aux,
    userId: _id,
  };
  return res.status(200).json(aoba);
}));

module.exports = routerRecipes;
