const jwt = require('jsonwebtoken');
const services = require('../services');

const createRecipe = async (req, res, next) => {
  const recipeData = req.body;
  const token = req.headers.authorization;
  const { _id } = jwt.decode(token);
  const newRecipe = await services.createRecipe({ ...recipeData, userId: _id });
  if (newRecipe.message) return next(newRecipe);
  res.status(201).json(newRecipe);
};

module.exports = createRecipe;