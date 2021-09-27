const connection = require('../api/connection');

const create = async (param, payload) => {
  const db = await connection();
  const { _id } = payload;

  const recipeObject = {
    name: param.name,
    ingredients: param.ingredients,
    preparation: param.preparation,
    userId: _id,
  };

  const recipe = await db.collection('recipes').insertOne(recipeObject);

  return recipe.ops[0];
};

module.exports = {
  create,
};
