const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const createdUser = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });

  return { recipe: { name, ingredients, preparation, userId, _id: createdUser.insertedId } };
};

const getAll = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const recipeIdExists = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  return recipe;
};

const updateRecipe = async ({ id, name, ingredients, preparation, userId }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  const recipe = await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } },
  );
    return recipe;
};

module.exports = { create, getAll, recipeIdExists, updateRecipe };