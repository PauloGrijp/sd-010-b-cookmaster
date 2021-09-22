const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const createRecipe = async (recipe) => {
  const db = await connection();
  const { insertedId } = await db.collection('recipes').insertOne(recipe);
  return insertedId;
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find();
  return recipes;
};

const getById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({
    _id: ObjectId(id),
  });
  return recipe;
};

const editRecipe = async (edition, id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOneAndUpdate(
    {
      _id: ObjectId(id),
    },
    {
      $set: edition,
    },
  );
  return recipe;
};

const deleteRecipe = async (recipeId) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({
    _id: ObjectId(recipeId),
  });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  editRecipe,
  deleteRecipe,
};
