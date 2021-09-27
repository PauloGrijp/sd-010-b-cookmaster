const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const recipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });

  return { name, ingredients, preparation, userId, _id: recipe.insertedId };
};

module.exports = {
  createRecipe,
};