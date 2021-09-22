const service = require('../Services/Recipes');

const getAll = async (_req, res) => {
  const result = await service.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await service.getById(id);
  return res.status(200).json(result);
};

const newRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const result = await service.newRecipe(name, ingredients, preparation, userId);
  return res.status(201).json({ recipe: result });
};

module.exports = {
  getAll,
  getById,
  newRecipe,
};
