const recipesService = require('../services/recipesService');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const recipe = await recipesService.create({ name, ingredients, preparation, userId });
  res.status(201).json({ recipe });
};

module.exports = {
  create,
};
