const express = require('express');
const rescue = require('express-rescue');
const { createServiceRecipes,
  getById, getAll, update, excluse, createImage } = require('../services/recipesService');
const { validateRecipes, validateToken } = require('../middlewares/validateRecipes');
const uploadFile = require('../middlewares/uploadFile');
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

routerRecipes.get(
  '/',
  rescue(async (_req, res) => {
    const fullRecipes = await getAll();
    return res.status(200).json(fullRecipes);
  }),
);

routerRecipes.get(
  '/:id',
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const recipe = await getById(id);
    if (recipe.isError) return next(recipe);
    return res.status(200).json(recipe);
  }),
);

routerRecipes.put(
  '/:id', validateToken, validateRecipes,
  rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await update(id, req.body);
    const { _id } = req.userId;

    const editRecipe = {
      ...recipe,
      userId: _id,
    };
    return res.status(200).json(editRecipe);
  }),
);

routerRecipes.delete(
  '/:id', validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    await excluse(id);
    return res.status(204).json();
  }),
);

routerRecipes.put(
  '/:id/image/', validateToken,
  uploadFile.single('image'),
  rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await createImage(id);
    const { _id } = req.userId;

    const editRecipe = {
      ...recipe,
      userId: _id,
    };
    return res.status(200).json(editRecipe);
  }),
);

module.exports = routerRecipes;
