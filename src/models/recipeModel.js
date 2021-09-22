// const { ObjectId } = require('mongodb');
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

// GET
const getAll = async () => {
  const db = await connectionDB.connect();
  const recipe = await db.collection('recipes').find().toArray();
  return recipe;
};

module.exports = { add, getAll };