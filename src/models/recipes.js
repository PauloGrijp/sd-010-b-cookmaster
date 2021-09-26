const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, user) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId: user,
  });

  return { recipe: { name, ingredients, preparation, userId: user, _id: recipe.insertedId } };
};

const getAll = async () => {
  const db = await connection();

  return db.collection('recipes').find({}).toArray();
};

const getOne = async (id) => {
  const db = await connection();

  return db.collection('recipes').findOne({ _id: ObjectId(id) });
};

const update = async ({ recipeId, name, ingredients, preparation, user }) => {
  const db = await connection();

  await db.collection('recipes')
    .updateOne({ _id: recipeId }, { $set: { name, ingredients, preparation, userId: user } });

  return { _id: recipeId, name, ingredients, preparation, userId: user };
};

const deleteOne = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();

  await db.collection('recipes').deleteOne({ _id: new ObjectId(id) });
};

const addRecipeImage = async (id, img) => {
  const db = await connection();

  return db
    .collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: img });
};

module.exports = { create, getAll, getOne, update, deleteOne, addRecipeImage };
