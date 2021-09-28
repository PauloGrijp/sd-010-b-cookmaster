const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

/**
 * 
 * @param {object} recipe informações necessárias da receita 
 * @returns 
 */
const createRecipe = async (recipe, id) => {
  const create = { ...recipe, userId: id };
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne(create);
  return {
    ...create,
    _id: newRecipe.insertedId,
  };
};

const getAllRecipes = async () => {
  const db = await connection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

/**
 * 
 * @param {string} id 
 * @returns 
 */
const getRecipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  if (!recipe) {
    return false;
  }
  return recipe;
};

const updateRecipe = async (recipe, id, recId) => {
  const validId = ObjectId.isValid(recId);
    if (!validId) {
      return false;
    }
  const update = { ...recipe, userId: id };
  const db = await connection();
  const updatedRecipe = await db.collection('recipes')
    .updateOne({ _id: ObjectId(recId) }, { $set: update });
  if (!updatedRecipe) {
    return false;
  }
  return {
    _id: ObjectId(recId),
    ...update,
  };
};

const deleteRecipe = async (id) => {
  const validId = ObjectId.isValid(id);
  if (!validId) {
    return false;
  }
  const db = await connection();
  const deletedRecipe = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return deletedRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
