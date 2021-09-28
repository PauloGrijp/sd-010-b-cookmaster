const { recipeModel } = require('../models');

const createRecipe = async (recipeInfo, userId) => (recipeModel.create(recipeInfo, userId));

const getAllRecipes = async () => recipeModel.getAllRecipes();

const getRecipeById = async (id) => {
  // Solicitamos que o model realize a busca no banco
  const recipe = await recipeModel.getRecipeById(id);

  // Caso nenhum autor seja encontrado, retornamos um objeto de erro.
  if (!recipe) {
    return {
      number: 404,
      error: {
        message: 'recipe not found',
      },
    };
  }

  // Caso haja um autor com o ID informado, retornamos esse autor
  return recipe;
};

const updateRecipe = async (recipeInfo, id) => {
  // Buscamos um produto com o mesmo nome que desejamos criar
  const getRecipe = await getRecipeById(id);

  if (getRecipe.error) return getRecipe;
  
  return recipeModel.updateRecipe(recipeInfo, id);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};