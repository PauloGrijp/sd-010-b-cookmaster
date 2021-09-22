const { connection } = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipeCollection = await connection();
  const recipe = await recipeCollection.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  });
  console.log({ ...recipe.ops[0] });
  return { ...recipe.ops[0], userId }; // verificar o retorno da função
};

module.exports = {
  createRecipe,
};
