const { ObjectId } = require('mongodb');
const connection = require('./mongoConnections');

const createFiledb = async (id, idrecipe) => {
  // if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/src/uploads/${idrecipe}.jpeg` } }, { returnOriginal: false },
  );
    // const { userId } = result.value;  {returnDocument: 'after'}
    // return { _id: ObjectId(id), name, ingredients, preparation, userId };
    return result.value;
  };

  module.exports = {
    createFiledb,
  };