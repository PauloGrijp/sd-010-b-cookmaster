const { ObjectId } = require('mongodb');
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

const getRecipeById = async (id) => {
  const db = await connect();
  const recipe = await db.collection(recipesCollection).findOne({ _id: ObjectId(id) });

  return recipe;
};

const updateRecipe = async (recipeToBeUpdated, recipeId, user) => {
  const { name, ingredients, preparation } = recipeToBeUpdated;
  const { _id: userId, role } = user; 

  const db = await connect();
  const recipe = await getRecipeById(recipeId);

  if (role === 'admin' || recipe.userId.toString() === userId.toString()) {
    const { value: updatedRecipe } = await db.collection(recipesCollection).findOneAndUpdate(
      { _id: ObjectId(recipeId) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );
    return updatedRecipe;
  }

return { accessError: true };
};

const deleteRecipe = async (recipeId, user) => {
  const { _id: userId, role } = user;

  const db = await connect();
  const recipe = await getRecipeById(recipeId);

  if (role === 'admin' || recipe.userId.toString() === userId.toString()) {
    return db.collection(recipesCollection).findOneAndDelete({ _id: Object(recipeId) });
  }
  return { accessError: true };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};