// const { ObjectId } = require('mongodb');
const {
  postRecipeModel,
  getRecipesModel, 
  getRecipeByIdModel, 
  putRecipeByIdModel, 
  delRecipeByIdModel, 
  putRecipeImageByIdModel } = require('../model/recipesModel');

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
// Requisito 7: SERVICE responsável por validar regras de negócio, chamar MODEL de atualização de receita por ID e retornar a receitas atualizada para o CONTROLLER.

const putRecipeByIdService = async ({
  recipeId, name, ingredients, preparation, reqUserId, role }) => {
  const { userId } = await getRecipeByIdModel(recipeId);

  // Comments: Compara se UserId da Receita é igual ao UserId da Requisição, & se o role do userId é igual a 'admin'.
  if (String(userId) !== String(reqUserId) && role !== 'admin') return null;

  const updatedRecipe = await putRecipeByIdModel({ recipeId, name, ingredients, preparation });

  return updatedRecipe;
};

// ---------------------------------------------------------------
// Requisito 8: SERVICE responsável por chamar MODEL que deleta receita por ID e retornar a receitas deletada para o CONTROLLER.

const delRecipeByIdService = async ({ recipeId, reqUserId, role }) => {
  const { userId } = await getRecipeByIdModel(recipeId);

  // Comments: Compara se UserId da Receita é igual ao UserId da Requisição, & se o role do userId é igual a 'admin'.
  if (String(userId) !== String(reqUserId) && role !== 'admin') return null;

  const deletedRecipe = await delRecipeByIdModel(recipeId);

  return deletedRecipe;
};

// ---------------------------------------------------------------
// Requisito 9: SERVICE responsável por chamar MODEL que salva caminho do arquivo de imagem da receita por ID e retornar as informações da receitas cadastrada para o CONTROLLER.

const putRecipeImageByIdService = async ({ recipeId, reqUserId, role, filename }) => {
  const { userId } = await getRecipeByIdModel(recipeId);

  // Comments: Compara se UserId da Receita é igual ao UserId da Requisição, & se o role do userId é igual a 'admin'.
  if (String(userId) !== String(reqUserId) && role !== 'admin') return null;

  const imageRecipeUpdated = await putRecipeImageByIdModel({ recipeId, filename });

  return imageRecipeUpdated;
};

// ---------------------------------------------------------------

module.exports = {
  postRecipeService,
  getRecipesService,
  getRecipeByIdService,
  putRecipeByIdService,
  delRecipeByIdService,
  putRecipeImageByIdService,
};
