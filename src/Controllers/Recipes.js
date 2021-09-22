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

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId, role } = req.user;  
  await service.checkRecipeOwner(userId, role, id);
  const result = await service.updateRecipe(id, name, ingredients, preparation);
  return res.status(200).json(result);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;  
  await service.checkRecipeOwner(userId, role, id);
  await service.deleteRecipe(id);
  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  newRecipe,
  updateRecipe,
  deleteRecipe,
};
