const connection = require('./connection');

const addRecipe = async (recipe) => {
  const db = await connection();
  
  const result = await db.collection('recipe').insertOne(recipe);
  
  console.log('model', result);
  
  return result.ops[0];
};

module.exports = { addRecipe };
