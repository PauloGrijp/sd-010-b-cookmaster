const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const create = async (recipeInfo, userId) => {
  const { name, ingredients, preparation } = recipeInfo;
  const db = await connection();
  const product = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
    return { recipe: { name, ingredients, preparation, _id: product.insertedId, userId } };
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipeData = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

  if (!recipeData) return null;

  return recipeData;
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
};