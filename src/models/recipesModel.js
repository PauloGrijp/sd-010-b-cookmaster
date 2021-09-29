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

const update = async (id, recipe, userId) => {
  const recipeID = new ObjectId(id);

  const db = await connection();
  await db.collection(RECIPES).updateOne(
    { _id: recipeID },
    { $set: { ...recipe } },
  );

  return {
    _id: recipeID,
    ...recipe,
    userId,
  };
};

const deleteRecipe = async (id) => {
  const db = await connection();
  const { deletedCount } = await db.collection(RECIPES).deleteOne({ _id: ObjectId(id) });

  return deletedCount;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteRecipe,
};
