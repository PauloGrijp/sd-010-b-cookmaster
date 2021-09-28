const { connect } = require('./connection');

const recipesCollection = 'recipes';

const createRecipe = async ({ name, ingredients, preparation }, userId) => {
  const db = await connect();
  const newRecipe = await db.collection(recipesCollection).insertOne({
    name,
    ingredients,
    preparation,
    userId,
  });

  return { 
    recipe: newRecipe.ops[0],
  };
};

const getAllRecipes = async () => {
  const db = await connect();
  const recipes = await db.collection(recipesCollection).find().toArray();

  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};