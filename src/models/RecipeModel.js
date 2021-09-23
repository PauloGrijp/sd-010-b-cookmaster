const { ObjectId } = require('mongodb');
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
  const recipe = await recipeCollection.find().toArray();
  return recipe;
};

const getRecipeById = async (id) => {
  const recipeCollection = await connection()
  .then((db) => db.collection('recipes'));
  const recipe = await recipeCollection.findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipe = async ({ name, ingredients, preparation }, id, userId) => {
  const recipeCollection = await connection()
  .then((db) => db.collection('recipes'));

  await recipeCollection.updateOne({ _id: ObjectId(id) },
  {
    $set: { name, ingredients, preparation },
  });

  return {
    name,
    ingredients,
    preparation,
    id,
    userId,
  };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
