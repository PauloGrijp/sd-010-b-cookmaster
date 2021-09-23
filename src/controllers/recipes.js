const RecipeService = require('../services/recipes');

const create = async (req, res) => {
  const newRecipe = req.body;
  const { authorization } = req.headers;
  // console.log(authorization, 'token');

  const createRecipe = await RecipeService.create(newRecipe, authorization);
  if (createRecipe.err) return res.status(401).json(createRecipe.err);
  if (createRecipe === false) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
  }
  return res.status(201).json({ recipe: createRecipe });
};

const getAllRecipes = async (_req, res) => {
  const recipes = await RecipeService.getAllRecipes();
  return res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipeService.getRecipeById(id);
  if (recipe.err) return res.status(404).json(recipe.err);
  return res.status(200).json(recipe);
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
};
