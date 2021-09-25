const RecipeService = require('../services/recipes');

const create = async (req, res) => {
  const newRecipe = req.body;
  const { authorization } = req.headers;

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

const updateRecipe = async (req, res) => {
  const update = req.body;
  const { id } = req.params;
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'missing auth token' });

  const recipe = await RecipeService.updateRecipe(id, update, authorization);

  if (recipe.err) return res.status(401).json(recipe.err);
  return res.status(200).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'missing auth token' });

  const del = await RecipeService.deleteRecipe(id);
  console.log((del, 'del'));
  if (del) return res.status(204).json();
  return res.status(401).json(del.err);
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
