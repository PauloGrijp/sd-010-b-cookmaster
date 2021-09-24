const {
  postRecipeModel,
  getRecipesModel } = require('../model/recipesModel');

// ---------------------------------------------------------------
// Requisito 3: SERVICE responsável por chamar MODEL de cadastro de receitas e retornar a receita cadastrada para o CONTROLLER.

const postRecipeService = async ({ name, ingredients, preparation, userId }) => {
  const newRecipe = await postRecipeModel({ name, ingredients, preparation, userId });

  return newRecipe;
};

// ---------------------------------------------------------------
// Requisito 4: SERVICE responsável por chamar MODEL de cadastro de listagem de receitas e retornar as receitas cadastradas para o CONTROLLER.

const getRecipesService = async () => {
  const recipes = await getRecipesModel();

  return recipes;
};

// ---------------------------------------------------------------

module.exports = {
  postRecipeService,
  getRecipesService,
};
