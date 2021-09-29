const connection = require('./connection');

async function createRecipe(recipe) {
  const { user, name, ingredients, preparation } = recipe;
  const db = await connection();
  const { id } = user;
  
  const result = await db.collection('recipes').insertOne({
    userId: id, name, ingredients, preparation,
  });
  return result.ops[0];
}

module.exports = {
  createRecipe,
};