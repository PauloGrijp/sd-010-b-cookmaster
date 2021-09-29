const { getConnection } = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await getConnection();
  const { insertedId: id } = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: id,
    },
  };
};

const getAllRecipes = async () => {
  const db = await getConnection();
  return db.collection('recipes').find().toArray();
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
