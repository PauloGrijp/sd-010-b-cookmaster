const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipesModel = async (name, ingredients, preparation) => {
  const db = await connect();
  const result = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  return result;
};

const getAll = async () => {
  const db = await connect();
  return db.collection('recipes').find().toArray();
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  return db.collection('recipes').findOne(ObjectId(id));
};

const update = async (id, updates) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: updates });
  return findById(id);
};

const excluse = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const recipe = await findById(id);
  db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return recipe;
};

const createImage = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const image = `localhost:3000/src/uploads/${id}.jpeg`;
  const recipe = await findById(id);
  const updates = { ...recipe, image };
  const db = await connect();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: updates });
  return updates;
};

module.exports = {
  createRecipesModel,
  getAll,
  findById,
  update,
  excluse,
  createImage,
};
