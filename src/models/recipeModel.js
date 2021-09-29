const { connection } = require('./connection');

// req 4
const registerRecipe = async ({ name, ingredients, preparation }) => {
  const dbConnection = await connection();
  const { insertedId: id } = await dbConnection.collection('recipes')
    .insertOne({ name, ingredients, preparation });
  return { name, ingredients, preparation, id };
};

const findAllRecipes = async () => {
  const dbConnection = await connection();
  const allRecipes = await dbConnection.collection('recipes').find().toArray();
  return allRecipes;
};

module.exports = {
  registerRecipe,
  findAllRecipes,
};
