const {
  postRecipeModel,
  getRecipesModel, 
  getRecipeByIdModel } = require('../model/recipesModel');

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
// Requisito 5: SERVICE responsável por chamar MODEL de pesquisa de receita por ID e retornar a receitas cadastrada para o CONTROLLER.

const getRecipeByIdService = async (id) => {
  const recipe = await getRecipeByIdModel(id);

  return recipe;
};

// ---------------------------------------------------------------

module.exports = {
  postRecipeService,
  getRecipesService,
  getRecipeByIdService,
};
