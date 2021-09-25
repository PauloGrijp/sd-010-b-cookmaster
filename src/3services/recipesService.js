const {
  createRecipeModel,
  getRecipesModel,
  getRecipesIDModel,
  deleteRecipesIDModel,
  putRecipesIDModel, 
  putImageModel } = require('../4models/recipeModel');
const { verifyToken } = require('../5middleware/logintoken');

const error = {
  invalid: { status: 400, message: 'Invalid entries. Try again.' },
  invalidToken: { status: 401, message: 'jwt malformed' },
  missingToken: { status: 401, message: 'missing auth token' },
};

const createRecipeService = async (recipe, token) => {
  const { name, ingredients, preparation } = recipe;
    if (!name || !ingredients || !preparation) { return error.invalid; }
  const answer = await verifyToken(token);
  if (answer === 'error') { return error.invalidToken; }
  const { _id } = answer;
  return createRecipeModel(recipe, _id);
};

const getRecipesService = async () => getRecipesModel();

const getRecipesIDService = async (req) => {
  const { id } = req.params;
  return getRecipesIDModel(id);
};

const putRecipesIDService = async (req) => {
  if (!req.headers.authorization) { return error.missingToken; }
  const answer = await verifyToken(req.headers.authorization);
  if (answer === 'error') { return error.invalidToken; }
  const { id } = req.params;
  return putRecipesIDModel(id, req.body);
};

const deleteRecipesIDService = async (req) => {
  if (!req.headers.authorization) { return error.missingToken; }
  const answer = await verifyToken(req.headers.authorization);
  if (answer === 'error') { return error.invalidToken; }

  const { id } = req.params;
  return deleteRecipesIDModel(id);
};

const putImageService = async (req) => {
  if (!req.headers.authorization) { return error.missingToken; }
  const answer = await verifyToken(req.headers.authorization);
  if (answer === 'error') { return error.invalidToken; }

  const { id } = req.params;
  const answerDB = await putImageModel(id);
  if (answerDB === 'error') { return error.invalidToken; }
  return answerDB;
};

module.exports = {
  createRecipeService,
  getRecipesService,
  getRecipesIDService,
  putRecipesIDService,
  deleteRecipesIDService,
  putImageService,
};