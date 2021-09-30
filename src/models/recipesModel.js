const getConnection = require('./connection');

const collection = 'recipes';

async function getAll() {
  const db = await getConnection();
  const result = await db.collection(collection).find({}).toArray();
  return result;
}

async function create({ name, ingredients, preparation, userId }) {
  const db = await getConnection();
  const result = await db
    .collection(collection)
    .insertOne({ name, ingredients, preparation });
  return { recipe: { _id: result.insertedId, name, ingredients, preparation, userId } };
}

module.exports = {
  getAll,
  create,
};
