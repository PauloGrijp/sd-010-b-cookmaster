const rescue = require('express-rescue');

const { recipeService } = require('../services');

const createRecipe = rescue(async (req, res, next) => {
  const recipeInfo = req.body;
  const { userId } = req;

  const newRecipe = await recipeService.createRecipe(recipeInfo, userId);

  if (newRecipe.error) return next(newRecipe);

  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // da nova receita
  return res.status(201).json(newRecipe);
});

module.exports = {
  createRecipe,
};
