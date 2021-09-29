const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await getConnection();
  const { insertedId: id } = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: id,
    },
  };
};

const getAllRecipes = async () => {
  const db = await getConnection();
  return db.collection('recipes').find().toArray();
};

const findRecipe = async ({ id }) => {
  const db = await getConnection();
  return db.collection('recipes').findOne({ _id: ObjectId(id) });
};

const updateRecipe = async ({ id, name, ingredients, preparation, userId }) => {
  const db = await getConnection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );
  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

const deleteRecipe = async ({ id }) => {
  const db = await getConnection();
  return db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipe,
  updateRecipe,
  deleteRecipe,
};
