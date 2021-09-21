const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ id, name, ingredients, preparation }) => {
  const db = await connection.getConnection();
  const recipes = await db.collection('recipes')
    .insertOne({ userId: ObjectId(id), name, ingredients, preparation });

  const newRecipes = recipes.ops[0];

  return { recipe: newRecipes };
};

const getAll = async () => {
  const db = await connection.getConnection();
  const recipes = await db.collection('recipes')
    .find().toArray();

  return recipes;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection.getConnection();
  const recipe = await db.collection('recipes')
    .findOne({ _id: ObjectId(id) });

  return recipe;
};

const update = async (id, userId, { name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection.getConnection();

  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  return {
    _id: id,
    userId,
    name,
    ingredients,
    preparation,
  };
};

module.exports = {
  create,
  getAll,
  findById,
  update,
};
