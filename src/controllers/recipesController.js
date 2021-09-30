const RecipesService = require('../services/recipesService');

const create = async (req, res) => {
  const recipeInput = req.body;
  const { _id } = req.user;

  const newRecipe = await RecipesService.create(recipeInput, _id);
  res.status(201).json(newRecipe);
};

const getAll = async (_req, res) => {
  const allRecipes = await RecipesService.getAll();
  res.status(200).json(allRecipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { recipe, code, message } = await RecipesService.getById(id);

  if (code === 404) return res.status(code).json({ message });

  res.status(code).json(recipe);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const recipe = req.body;

  const { recipeUpdated, code } = await RecipesService.update(id, recipe, _id);

  res.status(code).json(recipeUpdated);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const { code } = await RecipesService.deleteRecipe(id);
    res.status(code).send();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const uploadPhoto = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;

  try {
    const { code, recipeWithImage } = await RecipesService.uploadPhoto(id, path);
    res.status(code).json(recipeWithImage);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteRecipe,
  uploadPhoto,
};
