const express = require('express');
const rescue = require('express-rescue');
const { 
  createServiceRecipes, 
  getAllRecipes, 
  getServiceById, 
  editeRecipesById,
  deleteRecipesById,
} = require('../services/recipesService');
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

routerRecipes.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const recipeId = await getServiceById(id);

  if (recipeId.isError) {
    return next(recipeId);
  }

  return res.status(200).json(recipeId);
}));

routerRecipes.put('/:id', validateToken, validateRecipes, (rescue(async (req, res, _next) => {
  const { id } = req.params;
  const editRecipe = await editeRecipesById(id, req.body);

  const { _id } = req.userId;

  const newEditRecipe = {
    ...editRecipe,
    userId: _id,
  };

  return res.status(200).json(newEditRecipe);
})));

routerRecipes.delete('/:id', validateToken, async (req, res, _next) => {
  const { id } = req.params;
   await deleteRecipesById(id);

   return res.status(204).json();
});

module.exports = routerRecipes;
