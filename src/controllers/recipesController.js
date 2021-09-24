const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const Recipes = require('../services/recipesService');

const recipes = express.Router();

recipes.post('/', rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const recipe = await Recipes.create({ name, ingredients, preparation, userId: _id });
  return res.status(StatusCodes.CREATED).json({ recipe });
}));

module.exports = recipes;