const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const recipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { recipe: { ...recipe.ops[0] } };
};
const getAllRecipes = async () => {
  const db = await connection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const db = await connection();
  const updatedRecipe = await db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } }, { returnOriginal: false });
  return updatedRecipe.value;
};
const deleteRecipe = async (id) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

const insertImage = async (recipeId, image) => {
  const db = await connection();
  const recipe = await db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(recipeId) }, { $set: { image } }, { returnOriginal: false });

  return recipe.value;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};
