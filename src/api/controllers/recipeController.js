const multer = require('multer');
const service = require('../services/recipeService');
const model = require('../models/recipeModel');
const { checkRecipe } = require('../utils/validate');

async function createRecipe(req, res) {
  const recipe = await service.createRecipe(req.body, req.headers);
  return res.status(201).json({ recipe });
}

async function getAllRecipes(req, res) {
  const recipes = await model.getAllRecipes();
  return res.status(200).json(recipes);
}

async function getRecipe(req, res) {
  const { id } = req.params;
  const recipe = await model.getRecipe(id);
  checkRecipe(recipe);
  return res.status(200).json(recipe);
}

async function updateRecipe(req, res) {
  const result = await service.updateRecipe(req);
  return res.status(200).json(result);
}

async function removeRecipe(req, res) {
  const { params: { id }, headers: { authorization } } = req;
  
  await service.removeRecipe(id, authorization);
  return res.status(204).json();
}

async function multerValidation(req, res, next) {
  const { authorization: token } = req.headers;
  await service.multerValidation(token);
  next();
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'src/uploads'),
  filename: (req, file, callback) => callback(null, `${req.params.id}.jpeg`),
});

const uploadFile = multer({ storage });

async function saveImage(req, res) {
  const { id } = req.params;
  const result = await model.saveImage(id);
  return res.status(200).json(result);
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  removeRecipe,
  multerValidation,
  uploadFile,
  saveImage,
};