// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipe) => {
  const db = await connection();
  const createdRecipe = await db.collection('recipes').insertOne(recipe);
  return createdRecipe.ops[0];
};

module.exports = {
  createRecipe,
};
