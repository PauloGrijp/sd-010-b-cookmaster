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
  .insertOne({ name, ingredients, preparation, userId: id });
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
  const db = await connectionDB.connect();
  await db.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } });
  return { _id: id, ingredients, preparation, userId };
};

module.exports = { add, getAll, getId, update };