// const { ObjectId } = require('mongodb');
const { ObjectId } = require('mongodb');
const connectionDB = require('./connection');

/* 
FOLLOWING CRUD
    |__ CREATE
    |__ READ
    |__ UPDATE
    |__ DELETE

*/

// CREATE
const add = async (name, ingredients, preparation, id) => {
  const db = await connectionDB.connect();
  const recipe = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId: ObjectId(id) });
  return { recipe: {
    name,
    ingredients, 
    preparation,
    userId: id,
    _id: recipe.insertedId,
    },
  };
};

// READ
const getId = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  const db = await connectionDB.connect();
  const productOne = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return productOne;
};

// GET
const getAll = async () => {
  const db = await connectionDB.connect();
  const recipe = await db.collection('recipes').find().toArray();
  return recipe;
};

// UPDATE
const update = async ({ name, ingredients, preparation, id, userId }) => {
  if (!ObjectId.isValid(id)) { return null; }
  const db = await connectionDB.connect();
  await db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, 
  { $set: { name, ingredients, preparation, userId: ObjectId(userId) } });
  return { _id: id, name, ingredients, preparation, userId };
};

// ADD IMAGE
const addImageRecipe = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  const db = await connectionDB.connect();
  await db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, 
  { $set: { image: `localhost:3000/src/uploads/${id}.jpeg` } });
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  console.log(recipe);
  return recipe;
};

// DELETE
const exclude = async (id) => {
  const db = await connectionDB.connect();
  const res = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return res;
};

module.exports = { add, getAll, getId, update, exclude, addImageRecipe };