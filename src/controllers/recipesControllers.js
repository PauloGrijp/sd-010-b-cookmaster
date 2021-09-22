const rescue = require('express-rescue');
const { verifyToken } = require('../middlewares/verifyToken');
const RecipesService = require('../services/recipesServices');

const registerRecipes = rescue(async (req, res) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;
  const validate = await verifyToken(token);
  if (validate.message) return res.status(validate.status).json({ message: validate.message });
  const { _id } = validate;
  const result = await RecipesService.registerRecipes(name, ingredients, preparation, _id);
  if (result.message) return res.status(result.status).json({ message: result.message });
  const Obj = { ...result, userId: _id };
return res.status(201).json(Obj);
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

module.exports = {
  registerRecipes,
  getAllRecipes,
  getOneRecipes,
};
