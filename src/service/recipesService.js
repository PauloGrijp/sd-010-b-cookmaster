const { postRecipeModel } = require('../model/recipesModel');

// ---------------------------------------------------------------
// Requisito 3: SERVICE responsável por chamar MODEL de cadastro de receitas e retornar a receita cadastrada para o CONTROLLER.

const postRecipeService = async ({ name, ingredients, preparation }) => {
  const newRecipe = await postRecipeModel({ name, ingredients, preparation });

  return newRecipe;
};

// ---------------------------------------------------------------

module.exports = {
  postRecipeService,
};
