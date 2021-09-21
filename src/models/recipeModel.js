const { getConnection } = require('./connection');

const registerRecipe = async ({ userId, name, ingredients, preparation }) => {
  const db = await getConnection();

  const recipeCreated = await db.collection('recipes')
    .insertOne({ userId, name, ingredients, preparation });
    
  return recipeCreated.ops[0];
};

const getAll = async () => {
  const db = await getConnection();

  const recipes = await db.collection('recipes').find().toArray();

  return { recipes };
};

module.exports = { 
  registerRecipe,
  getAll,
};
