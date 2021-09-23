const rescue = require('express-rescue');
// const { verifyToken } = require('../middlewares/verifyToken');
const RecipesService = require('../services/recipesServices');

const registerRecipes = rescue(async (req, res) => {
  // const token = req.headers.authorization;
  // const validate = await verifyToken(token);
  // if (validate.message) return res.status(validate.status).json({ message: validate.message });
  const { name, ingredients, preparation } = req.body;
  const userId = req.user;
  const result = await RecipesService.registerRecipes(name, ingredients, preparation, userId);
  if (result.message) return res.status(result.status).json({ message: result.message });
return res.status(201).json(result);
});

const getAllRecipes = rescue(async (req, res) => {
  const result = await RecipesService.getAllRecipes();
  res.status(200).json(result);
});

const getOneRecipes = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await RecipesService.getOneRecipes(id);
  if (result.message) return res.status(result.status).json({ message: result.message });
  return res.status(200).json(result);
});

const updateRecipes = rescue(async (req, res) => {
  // const token = req.headers.authorization;
  // const validate = await verifyToken(token);
  // if (validate.message) return res.status(validate.status).json({ message: validate.message });
  const { id } = req.params;
  // const { _id } = validate;
  const userId = req.user;
  const { body } = req;
  const result = await RecipesService.updateRecipes(body, id, userId);
  return res.status(200).json(result);
});

const deleteRecipes = rescue(async (req, res) => {
  const { id } = req.params;
  // const token = req.headers.authorization;
  // const validate = await verifyToken(token);
  // if (validate.message) return res.status(validate.status).json({ message: validate.message });
  await RecipesService.deleteRecipes(id);
  return res.status(204).send();
});

const addImage = rescue(async (req, res) => {
  // const token = req.headers.authorization;
  // const validate = await verifyToken(token);
  // if (validate.message) return res.status(validate.status).json({ message: validate.message });
  const { id } = req.params;
  const userId = req.user;
  const { file } = req;
  const newImage = await RecipesService.addImage(id, file, userId);
  return res.status(200).json(newImage);
});

module.exports = {
  registerRecipes,
  getAllRecipes,
  getOneRecipes,
  updateRecipes,
  deleteRecipes,
  addImage,
};
