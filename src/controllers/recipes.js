const service = require('../services/recipes');

async function newRecipe(req, res) {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const result = await service.newRecipe(name, ingredients, preparation, userId);
  return res.status(201).json({ recipe: result });
}

async function fetchRecipes(req, res) {
  const result = await service.fetchRecipes();
  return res.status(200).json(result);
}

async function getById(req, res) {
  const { id } = req.params;
  const result = await service.getById(id);
  return res.status(200).json(result);
}

async function editRecipe(req, res) {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const result = await service.editRecipe(id, name, ingredients, preparation);
  return res.status(200).json(result);
}

async function deleteRecipe(req, res) {
  const { id } = req.params;
  const result = await service.deleteRecipe(id);
  return res.status(204).json(result);
}

module.exports = {
  newRecipe,
  fetchRecipes,
  getById,
  editRecipe,
  deleteRecipe,
};
