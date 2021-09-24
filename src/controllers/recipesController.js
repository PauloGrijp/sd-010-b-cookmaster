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

recipes.post('/',
  recipesValidate,
  validateJWT,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const recipe = await Recipes.create({ name, ingredients, preparation, userId: _id });
    return res.status(StatusCodes.CREATED).json({ recipe });
}));

module.exports = recipes;