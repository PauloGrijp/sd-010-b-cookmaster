const connection = require('./connection');

const recipes = 'recipes';

const create = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const result = await db.collection(recipes).insertOne({ name, ingredients, preparation, userId });
  const createdRecipe = result.ops[0];
  return createdRecipe;
};

module.exports = {
  create,
};