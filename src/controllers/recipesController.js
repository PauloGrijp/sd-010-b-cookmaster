const recipesServices = require('../services/recipesServices');

const createRecipe = async (req, res) => {
  const recipe = req.body;
  const { user: { _id } } = req;

  recipe.userId = _id;

  const createdRecipe = await recipesServices.createRecipe(recipe);
  if (createdRecipe.error) {
    const { error: { status, message } } = createdRecipe;
    return res.status(status).json({ message });
  }

  res.status(201).json({ ...createdRecipe });
};

const getAllRecipes = async (_req, res) => {
  const foundRecipes = await recipesServices.getAllRecipes();

  res.status(200).json(foundRecipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const foundRecipe = await recipesServices.getRecipeById(id);

  if (foundRecipe.error) {
    const { error: { status, message } } = foundRecipe;
    return res.status(status).json({ message });
  }

  res.status(200).json(foundRecipe);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = {
    _id: id,
    ...req.body,
  };

  const updatedRecipe = await recipesServices.updateRecipe(recipe);

  if (updatedRecipe.error) {
    const { error: { message, status } } = updatedRecipe;
    res.status(status).json({ message });
  }

  res.status(200).json(updatedRecipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};