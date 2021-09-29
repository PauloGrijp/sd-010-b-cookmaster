const service = require('../services/recipeService');

async function createRecipe(req, res) {
  const recipe = await service.createRecipe(req.body, req.headers);
  return res.status(201).json({ recipe });
}

module.exports = {
  createRecipe,
};