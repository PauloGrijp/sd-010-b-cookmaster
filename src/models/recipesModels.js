const { connection } = require('./connection');

const createRecipes = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const { insertedId: id } = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
    
  return {
    recipe: { name, ingredients, preparation, userId, _id: id },
  };
};

module.exports = {
  createRecipes,
};