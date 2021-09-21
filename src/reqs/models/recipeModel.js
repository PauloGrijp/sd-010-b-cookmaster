const { getConnection } = require('../connection/connection');

const insertRecipe = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();
  const { insertedId: _id } = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  const recipeOk = { recipe: { name, ingredients, preparation, userId, _id } };
  return recipeOk;
};

module.exports = { insertRecipe };
