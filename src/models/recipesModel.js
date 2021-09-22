const { getConnection } = require('./connection');

const registerRecipes = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();
  const recipes = await db.collection('users')
  .insertOne({ name, ingredients, preparation });
  return { recipe: {
    name,
    ingredients,
    preparation,
    userId,
    _id: recipes.insertedId,
  },
  };
};

module.exports = { registerRecipes };