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

const updateRecipe = async (query, id) => {
  const connect = await getConnection();
  const update = await connect.collection(RECIPES_DOCUMENTS).findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: query },
  );

  return update;
};

const deleteRecipe = async (id) => {
  const connect = await getConnection();
  const { deletedCount } = await connect.collection(RECIPES_DOCUMENTS)
    .deleteOne({ _id: ObjectId(id) });
  
  return deletedCount;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
