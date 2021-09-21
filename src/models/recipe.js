const connection = require('./connection');

const create = async (recipe) => {
  const db = await connection();
  const recipeAdd = await db.collection('recipes').insertOne(recipe);

  return recipeAdd.ops[0];
};

module.exports = { create };
