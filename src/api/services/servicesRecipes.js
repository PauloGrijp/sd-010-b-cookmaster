const models = require('../models/modelRecipes');
const validations = require('../utils/validations/validationsRecipes');

const create = async ({ name, ingredients, preparation }, userId) => {
  validations.recipesName(name);
  validations.recipesIngredients(ingredients);
  validations.recipesPreparation(preparation);

  return models.create(name, ingredients, preparation, userId)
    .then((data) => ({ status: 201, recipe: data.ops[0] }));
};

const getAll = async () => models.getAll()
  .then((data) => ({ status: 200, data }));

const getById = async ({ id }) => {
  try {
    const data = await models.getById(id);
    return ({ status: 200, data });
  } catch (erro) {
    const err = { statusCode: 'recipeNotFound' };
    throw err;
  }
}; 

const updateById = async ({ id }, { name, ingredients, preparation }, userId) => {
  validations.recipesName(name);
  validations.recipesIngredients(ingredients);
  validations.recipesPreparation(preparation);
  const recipe = { _id: id, name, ingredients, preparation, userId };
  return models.updateById(id, name, ingredients, preparation)
    .then(() => ({ status: 200, recipe }));
};

const deleteById = async ({ id }) => models.deleteById(id)
  .then(() => ({ status: 204 }));

  const putImage = (id, path) => models.putImage(id, `localhost:3000/${path}`)
  .then(() => models.getById(id).then((data) => ({ status: 200, data })));
  
module.exports = { create, getAll, getById, updateById, deleteById, putImage };
