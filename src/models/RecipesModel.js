const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const recipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });

  return { name, ingredients, preparation, userId, _id: recipe.insertedId };
};

const getRecipes = async () => {
  const db = await connection();
  const getAll = await db.collection('recipes').find().toArray();
  return getAll;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const getId = await db.collection('recipes').findOne(new ObjectId(id));
  if (!getId) {
    return null;
  }
  return getId;
};

const updateRecipes = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  await db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  return { _id: id, name, ingredients, preparation };
};

const excludeRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const recipe = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });

  if (!recipe.deleteCount) {
    return null;
  }
  return recipe;
};

module.exports = {
  createRecipe,
  getRecipes,
  findById,
  updateRecipes,
  excludeRecipe,
};