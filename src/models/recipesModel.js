const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

/**
 * 
 * @param {object} recipe informações necessárias da receita 
 * @returns 
 */
const createRecipe = async (recipe, id) => {
  const create = { ...recipe, userId: id };
  console.log(create);
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne(create);
  console.log(newRecipe);
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

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
