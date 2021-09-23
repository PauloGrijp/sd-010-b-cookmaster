const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (data) => {
  const db = await connection();
  const response = await db.collection('recipes').insertOne(data);
  const recipe = { ...response.ops[0] };

  return { recipe };
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find({}).toArray();

  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
}; 