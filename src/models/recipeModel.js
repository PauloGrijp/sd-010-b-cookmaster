const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

const addNewRecipeModel = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const result = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return result.ops[0];
};

const getRecipes = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const getById = async (id) => {
  try {
    const db = await connection();
    const result = await db.collection('recipes').findOne(ObjectId(id));
    if (result) {
      return { status: 200, result };
    }
    return {
      status: 404, err: { message: 'recipe not found' } };
  } catch (error) {
    return {
      status: 404, err: { message: 'recipe not found' } };
  }
};

module.exports = { addNewRecipeModel, getRecipes, getById };