const { ObjectId } = require('bson');
const getConnection = require('./connection');

const collection = 'recipes';

async function getAll() {
  const db = await getConnection();
  const result = await db.collection(collection).find({}).toArray();
  return result;
}

async function getById({ id }) {
  const db = await getConnection();
  const recipe = await db.collection(collection).findOne({ _id: ObjectId(id) });
  return recipe;
}

async function create({ name, ingredients, preparation, userId }) {
  const db = await getConnection();
  const result = await db
    .collection(collection)
    .insertOne({ name, ingredients, preparation });
  return { recipe: { _id: result.insertedId, name, ingredients, preparation, userId } };
}

async function update({ name, ingredients, preparation, userId }) {
  const db = await getConnection();
  await db
    .collection(collection)
    .updateOne({ _id: ObjectId(userId) }, { $set: { name, ingredients, preparation } });
    
  return { _id: ObjectId(userId), name, ingredients, preparation, userId };
}

async function remove({ id }) {
  const db = await getConnection();
  await db
    .collection(collection)
    .deleteOne({ _id: ObjectId(id) });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
