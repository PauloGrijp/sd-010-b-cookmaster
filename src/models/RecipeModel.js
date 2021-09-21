const { connection } = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipeCollection = await connection()
  .then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
  }));
  console.log(recipeCollection);
  return { recipeCollection, userId }; // verificar o retorno da função
};

module.exports = {
  createRecipe,
};
