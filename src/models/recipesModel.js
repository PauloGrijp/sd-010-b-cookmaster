const { ObjectId } = require('mongodb');
const connection = require('./connection');

const RECIPES = 'recipes';

const create = async (recipe, id) => {
  const newRecipe = { ...recipe, userId: id };
  const db = await connection();
  const { insertedId } = await db.collection(RECIPES).insertOne(newRecipe);
  return {
    recipe: {
      ...recipe,
      _id: insertedId,
    },
  };
};

const getAll = async () => {
  const db = await connection();
  const allRecipes = await db.collection(RECIPES).find({}).toArray();
  return allRecipes;
};

const getById = async (id) => {
  const db = await connection();
  const recipe = await db.collection(RECIPES).findOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
};
