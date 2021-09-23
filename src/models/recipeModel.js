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

const deleteRecipe = async (id) => {
  const db = await connection();
  const result = await db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) });
  return result;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );
  return { _id: id, name, ingredients, preparation };
};

module.exports = { addNewRecipeModel, getRecipes, getById, deleteRecipe, editRecipe };