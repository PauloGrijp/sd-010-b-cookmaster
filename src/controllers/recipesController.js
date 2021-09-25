const { join } = require('path');
const { getAllRecipesS, getRecipeIdS, createRecipeS, updateRecipeS,
  uploadImgRecipeS, deleteRecipeS } = require('../services/recipesService');
const { getAuthorRecipeS } = require('../services/recipesService');

const createRecipeC = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const result = await createRecipeS(name, ingredients, preparation, userId);
  return res.status(201).json({ recipe: result });
};
const getAllRecipesC = async (_req, res) => {
  const result = await getAllRecipesS();
  return res.status(200).json(result);
};
const getRecipeIdC = async (req, res) => {
  const { id } = req.params;
  const result = await getRecipeIdS(id);
  return res.status(200).json(result);
};
const updateRecipeC = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId, role } = req.user;  
  await getAuthorRecipeS(userId, role, id);
  const result = await updateRecipeS(id, name, ingredients, preparation);
  return res.status(200).json(result);
};
const deleteRecipeC = async (req, res) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;  
  await getAuthorRecipeS(userId, role, id);
  await deleteRecipeS(id);
  return res.status(204).end();
};
const uploadImgRecipeC = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const imagePath = join('localhost:3000', 'src', 'uploads', filename);
  const result = await uploadImgRecipeS(id, imagePath);
  return res.status(200).json(result);
};

module.exports = {
  getAllRecipesC,
  getRecipeIdC,
  createRecipeC,
  updateRecipeC,
  deleteRecipeC,
  uploadImgRecipeC,
};
