const { createRecipes,
  getAll, auxGetById, updateOne, deleteOne } = require('../model/recipesModel');
const { errorByIdRecipes } = require('../middleware/estructError');

/* const getAll = async () => {
  const result = await auxGetAll();
  return result;
};
 */
const getById = async (id) => {
  const resultRecipesId = await auxGetById(id);
  if (!resultRecipesId) {
    return errorByIdRecipes('recipe not found');
  }
  return resultRecipesId;
};

module.exports = { createRecipes, getAll, getById, updateOne, deleteOne };
