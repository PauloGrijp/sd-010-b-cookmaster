const jwt = require('jsonwebtoken');
const services = require('../services');

const createRecipe = async (req, res, next) => {
  const recipeData = req.body;
  const token = req.headers.authorization;
  const { _id } = jwt.decode(token);
  const NewRecipe = await services.createRecipe({ _id, ...recipeData });
  if (NewRecipe.message) return next(NewRecipe);
  res.status(201).json(NewRecipe);
};

module.exports = createRecipe;