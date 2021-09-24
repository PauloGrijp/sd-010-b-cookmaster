const connectiom = require('./conection');

const create = async (recipe) => {
  const db = await connectiom();
  const newRecipe = await db.collection('recipes').insertOne(recipe);
  return newRecipe.ops[0];
};

module.exports = {
  create,
};