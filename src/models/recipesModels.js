const { ObjectId } = require('mongodb');
const connectiom = require('./conection');

const create = async (recipe) => {
  const db = await connectiom();
  const newRecipe = await db.collection('recipes').insertOne(recipe);
  return newRecipe.ops[0];
};

const getAll = async () => {
  const db = await connectiom();
  return db.collection('recipes').find().toArray();
};

const findId = async (id) => {
  const db = await connectiom();
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return db.collection('recipes').findOne(ObjectId(id));
};

module.exports = {
  create,
  getAll,
  findId,
};