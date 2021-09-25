const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const Recipes = require('../services/recipesService');

const recipesValidate = require('../middlewares/recipesMiddlewares');
const validateJWT = require('../middlewares/validateJWT');

const recipes = express.Router();

recipes.get('/', rescue(async (req, res) => {
  const recipesAll = await Recipes.getAll();
  return res.status(StatusCodes.OK).json(recipesAll);
}));

recipes.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.findId(id);

  if (recipe.isError) {
    return res.status(recipe.code).json({ message: recipe.message });
  }
  return res.status(StatusCodes.OK).json(recipe);
}));

recipes.post('/',
  recipesValidate,
  validateJWT,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const recipe = await Recipes.create({ name, ingredients, preparation, userId: _id });
    return res.status(StatusCodes.CREATED).json({ recipe });
}));

recipes.put('/:id', 
  validateJWT,
  rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipes.update(id, req.body);
    return res.status(StatusCodes.OK).json(recipe);
}));

module.exports = recipes;