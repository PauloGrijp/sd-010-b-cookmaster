const models = require('../models');

const getRecipes = async (_req, res) => {
  const recipes = await models.getRecipes;
  res.status(200).json(recipes);
};

module.exports = getRecipes;