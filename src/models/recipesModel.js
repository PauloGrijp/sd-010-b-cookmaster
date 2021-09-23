const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

const COLLECTION = 'recipes';

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const createRecipe = await db.collection(COLLECTION)
    .insertOne({ name, ingredients, preparation, userId });
  
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: createRecipe.insertedId,
  };
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection(COLLECTION).find().toArray();

  return recipes;
};

const getById = async (id) => {
  const db = await connection();
  const recipe = await db.collection(COLLECTION).findOne({ _id: ObjectId(id) });

  return recipe;
};

const updateRecipe = async (id, body, userId) => {
  const db = await connection();
  const { name, ingredients, preparation } = body;
  await db.collection(COLLECTION)
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation, userId } },
    );

  return { name, ingredients, preparation, userId, _id: ObjectId(id) };
};

module.exports = {
  create,
  getAll,
  getById,
  updateRecipe,
};