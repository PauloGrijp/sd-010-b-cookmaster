const { ObjectId } = require('mongodb');
const { getConnection } = require('../connection/connection');

const RECIPES_COLLECTION = 'recipes';

const createRecipe = async (newRecipe) => {
  const connect = await getConnection();
  const create = await connect.collection(RECIPES_COLLECTION).insertOne(newRecipe);

  return create.ops[0];
};

const getRecipes = async () => {
  const connect = await getConnection();
  const recipes = await connect.collection(RECIPES_COLLECTION).find({}).toArray();

  return recipes;
};

const getRecipeById = async (id) => {
  const connect = await getConnection();
  const recipe = await connect.collection(RECIPES_COLLECTION).findOne({ _id: ObjectId(id) });

  return recipe;
};

const updateRecipe = async (query, id) => {
  const connect = await getConnection();
  const update = await connect.collection(RECIPES_COLLECTION).findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: query },
  );

  return update;
};

const deleteRecipe = async (id) => {
  const connect = await getConnection();
  const { deletedCount } = await connect.collection(RECIPES_COLLECTION)
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
