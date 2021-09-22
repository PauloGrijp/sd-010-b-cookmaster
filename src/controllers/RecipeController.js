const code = require('http-status-codes');
const RecipeService = require('../services/RecipeService');
const RecipeModel = require('../models/RecipeModel');

// cria a receita
const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  console.log(req.user, 'requisição de user');
  const { message, id } = await RecipeService.createRecipe({ 
    name, ingredients, preparation,
  });
  
  if (message) {
    return res.status(code.BAD_REQUEST).json({ message });
  }

  return res.status(code.CREATED).json(
    { recipe: { name, ingredients, preparation, userId, _id: id } },
    );
};

// visualiza receitas
const getAllRecipes = async (req, res) => {
  const allRecipes = await RecipeModel.getAllRecipes();
  if (!allRecipes) {
    return res.status(code.NOT_FOUND).json({ message: 'Nenhuma receita encontrada' });
  }
  return res.status(code.OK).json(allRecipes);
};

// visualiza receita pelo ID
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeService.getRecipeById(id);
  
  if (recipe.message) {
    return res.status(code.NOT_FOUND).json({ message: 'recipe not found' });
  }
  return res.status(code.OK).json(recipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};