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
  const recipe = await db.collection('users')
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

module.exports = { add };