const { getAllRecipesS, getIdRecipesS, createRecipesS, updateRecipesS,
  deleteRecipesS, authorRecipesS } = require('../services/recipesService');

const createRecipesC = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const result = await createRecipesS(name, ingredients, preparation, userId);
  return res.status(201).json({ recipe: result });
};
const getAllRecipesC = async (_req, res) => {
  const result = await getAllRecipesS();
  return res.status(200).json(result);
};
const getIdRecipesC = async (req, res) => {
  const { id } = req.params;
  const result = await getIdRecipesS(id);
  return res.status(200).json(result);
};
const updateRecipesC = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId, role } = req.user;  
  await authorRecipesS(userId, role, id);
  const result = await updateRecipesS(id, name, ingredients, preparation);
  return res.status(200).json(result);
};
const deleteRecipesC = async (req, res) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;  
  await authorRecipesS(userId, role, id);
  await deleteRecipesS(id);
  return res.status(204).end();
};

module.exports = {
  getAllRecipesC,
  getIdRecipesC,
  createRecipesC,
  updateRecipesC,
  deleteRecipesC,
};
