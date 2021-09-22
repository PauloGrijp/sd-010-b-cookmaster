const RecipesService = require('../services/RecipesServices');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await RecipesService.create(name, ingredients, preparation, _id);

  if (recipe.message) {
    return res.status(400).json({ message: recipe.message });
  }

  return res.status(201).json({ recipe });
};

const recipesList = async (req, res) => {
  const listAll = await RecipesService.getAll();

  return res.status(200).json(listAll);
};

const findRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipeById = await RecipesService.findById(id);

  if (recipeById.message) {
    return res.status(404).json({ message: recipeById.message });
  }

  res.status(200).json(recipeById);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipeUpdate = await RecipesService.update(id, name, ingredients, preparation, _id);

 recipeUpdate.userId = _id;
 
  res.status(200).json(recipeUpdate);
};

const excludeRecipe = async (req, res) => {
  const { id } = req.params;

  await RecipesService.exclude(id);

  res.status(204).json({ message: 'excluded product' });
};

module.exports = {
  createRecipe,
  recipesList,
  findRecipeById,
  updateRecipe,
  excludeRecipe,
};