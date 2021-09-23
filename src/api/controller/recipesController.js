const recipesService = require('../service/recipesService');

const RECIPE_NOT_FOUND = 'recipe not found';

const createRecipes = async (req, res) => {
  const token = req.headers.authorization;
  const { body } = req;

  const recipe = await recipesService
    .createRecipes({ body, token });

  if (recipe === 'jwt malformed') {
    return res.status(401).json({ message: recipe });
  }
  
  if (recipe === 'keyNotExist') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return res.status(201).json({ recipe });
};

const getAllRecipes = async (req, res) => {
  const recipes = await recipesService.getAllRecipes();
  res.status(200).json(recipes);
};

const getByIdRecipes = async (req, res) => {
  const { id } = req.params;
  const recipes = await recipesService.getByIdRecipes(id);

  if (!recipes) {
    return res.status(404).json({ message: RECIPE_NOT_FOUND });
  }

  res.status(200).json(recipes);
};

const updateByIdRecipes = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const { body } = req;
  
  const recipes = await recipesService
  .updateByIdRecipes(id, body, token);

  if (recipes === 'jwt malformed') {
    return res.status(401).json({ message: recipes });
  }
  if (recipes === 'missing auth token') {
    return res.status(401).json({ message: recipes });
  }
  
  if (!recipes) {
    return res.status(404).json({ message: RECIPE_NOT_FOUND });
  }
  
  res.status(200).json(recipes);
};

const deleteByIdRecipes = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  
  const recipes = await recipesService
  .deleteByIdRecipes(id, token);

  if (recipes === 'jwt malformed') {
    return res.status(401).json({ message: recipes });
  }
  if (recipes === 'missing auth token') {
    return res.status(401).json({ message: recipes });
  }
  
  if (!recipes) {
    return res.status(404).json({ message: RECIPE_NOT_FOUND });
  }
  
  res.status(204).json(recipes);
};

const createImageRecipe = async (req, res) => {
  const token = req.headers.authorization;
  const { path } = req.file;
  const { id } = req.params;
  
  const recipes = await recipesService
  .createImageRecipe(id, token, path);

  if (recipes === 'jwt malformed') {
    return res.status(401).json({ message: recipes });
  }
  if (recipes === 'missing auth token') {
    return res.status(401).json({ message: recipes });
  }
  
  if (!recipes) {
    return res.status(404).json({ message: RECIPE_NOT_FOUND });
  }
  
  res.status(200).json(recipes);
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getByIdRecipes,
  updateByIdRecipes,
  deleteByIdRecipes,
  createImageRecipe,
};