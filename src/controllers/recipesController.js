const service = require('../services/recipesService');

const createNewRecipe = async (req, res) => {
  const { authorization: token } = req.headers;
  const { name, ingredients, preparation } = req.body;
  const result = await service.createNewRecipe(name, ingredients, preparation, token);
  if (result.err) {
    return res.status(result.status).json(result.err);
  }
  res.status(201).json(result);
};

module.exports = {
  createNewRecipe,
};