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

module.exports = {
  createRecipe,
  recipesList,
};