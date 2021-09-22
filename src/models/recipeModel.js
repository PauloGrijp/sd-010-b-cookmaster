const connection = require('./mongoConnection');

const addNewRecipeModel = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const result = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return result.ops[0];
};

module.exports = { addNewRecipeModel };