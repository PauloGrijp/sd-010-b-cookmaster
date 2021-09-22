const { ObjectId } = require('mongodb');
const { getConnection } = require('../connection/connection');

const RECIPES_DOCUMENTS = 'recipes';

const createRecipe = async (newRecipe) => {
  const connect = await getConnection();
  const create = await connect.collection(RECIPES_DOCUMENTS).insertOne(newRecipe);

  return create.ops[0];
};

const getRecipes = async () => {
  const connect = await getConnection();
  const recipes = await connect.collection(RECIPES_DOCUMENTS).find({}).toArray();

  return recipes;
};

const getRecipeById = async (id) => {
  const connect = await getConnection();
  const recipe = await connect.collection(RECIPES_DOCUMENTS).findOne({ _id: ObjectId(id) });

  return recipe;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
};
