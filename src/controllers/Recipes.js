const express = require('express');
const rescue = require('express-rescue');
const { recipeValidate, auth, upload } = require('../middlewares');
const Recipes = require('../services/Recipes');
const { CREATE, SUCCESS, NO_CONTENT } = require('../utils/statusCode');

const recipes = express.Router();

recipes.get(
  '/',
  rescue(async (req, res) => {
    const fullRecipes = await Recipes.getAll();
    return res.status(SUCCESS).json(fullRecipes);
  }),
);

recipes.get(
  '/:id',
  rescue(async (req, res, next) => {
    const { id: idRecipe } = req.params;
    const recipe = await Recipes.findById(idRecipe);
    if (recipe.isError) return next(recipe);
    return res.status(SUCCESS).json(recipe);
  }),
);

recipes.use(auth);

recipes.post(
  '/',
  recipeValidate,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.user;
    const recipe = await Recipes.create(name, ingredients, preparation, id);
    return res.status(CREATE).json({ recipe });
  }),
);

recipes.put(
  '/:id/image/',
  upload.single('image'),
  rescue(async (req, res) => {
    const { id: idRecipe } = req.params;
    const recipe = await Recipes.addImage(idRecipe);
    return res.status(SUCCESS).json(recipe);
  }),
);

recipes.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    await Recipes.excluse(id);
    return res.status(NO_CONTENT).json();
  }),
);

recipes.put(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipes.update(id, req.body);
    return res.status(SUCCESS).json(recipe);
  }),
);

module.exports = recipes;
