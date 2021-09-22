const jwt = require('jsonwebtoken');
const services = require('../services');

const createRecipe = (req, res, next) => {
  const recipeData = req.body;
  const token = res.headers.Authorization;
  const { _id } = jwt.decode(token);
  const NewRecipe = services.createRecipe({ _id, ...recipeData });
  if (!NewRecipe) return next(NewRecipe);
  res.status(201).json(NewRecipe);
};

module.exports = {
  createRecipe,
};