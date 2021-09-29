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

module.exports = {
  createRecipe,
};