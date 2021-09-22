const { connection } = require('./connection');

const createRecipe = async ({ name, ingredients, preparation }) => {
  const recipeCollection = await connection()
  .then((db) => db.collection('recipes'));
  const { insertedId: id } = await recipeCollection.insertOne(
    { name, ingredients, preparation },
  );
  // console.log(recipe);
  
  return { name, ingredients, preparation, id };
};

const getAllRecipes = async () => {
  const recipeCollection = await connection()
  .then((db) => db.collection('recipes'));
  const recipe = await recipeCollection.collection('recipes').find().toArray();
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
