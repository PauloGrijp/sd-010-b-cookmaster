const connection = require('../api/connection');

const create = async (param) => {
  const db = await connection();

  const recipeObject = {
    name: param.name,
    ingredients: param.ingredients,
    preparation: param.preparation,
    userId: '',
  };

  const recipe = await db.collection('recipes').insertOne(recipeObject);

  return recipe.ops[0];
};

module.exports = {
  create,
};
