const model = require('../models/recipeModel');
const { existsToken, checkToken, validRecipe } = require('../utils/validate');

async function createRecipe(body, headers) {
  validRecipe(body);
  const { authorization: token } = headers;

  existsToken(token);
  const user = checkToken(token);
  const recipe = await model.createRecipe({
    ...body, user,
  });
  return recipe;
}

async function updateRecipe(req) {
  const { params: { id }, headers, body } = req;
  const { authorization: token } = headers;
  existsToken(token);
  checkToken(token);

  const result = await model.updateRecipe(id, body);
  return result;
}

async function removeRecipe(id, token) {
  existsToken(token);
  checkToken(token);
  await model.removeRecipe(id);
  return null;
}

module.exports = {
  createRecipe,
  updateRecipe,
  removeRecipe,
};