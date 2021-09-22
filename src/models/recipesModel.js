const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const { insertedId: _id } = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id,
  };
};

module.exports = {
  createRecipe,
};