const { getConnection } = require('./connection');

const registerRecipe = async ({ userId, name, ingredients, preparation }) => {
  const db = await getConnection();

  const recipeCreated = await db.collection('recipes')
    .insertOne({ userId, name, ingredients, preparation });
    
  return recipeCreated.ops[0];
};

module.exports = { 
  registerRecipe,
};
