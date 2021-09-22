const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const { insertedId: _id } = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id,
  };
};

const getAllRecipes = async () => {
  const db = await connection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

const getRecipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipe = async (id, body, userId) => {
  const db = await connection();
  const { name, ingredients, preparation } = body;
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, 
    { $set: { name, ingredients, preparation, userId } },
  );
  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

const deleteRecipe = async (id) => {
  const db = await connection();
  return db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const uploadImage = async (path, recipeId) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes')
  .findOneAndUpdate(
    { _id: ObjectId(recipeId) },
    { $set: { image: `localhost:3000/${path}` } },
    { returnOriginal: false },
  );
  return newRecipe.value;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};