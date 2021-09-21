const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  return db.collection('recipes').findOne(ObjectId(id));
};

const create = async (name, ingredients, preparation, userId) => {
  const recipe = { name, ingredients, preparation, userId };
  const db = await connection();
  const { insertedId } = await db.collection('recipes').insertOne(recipe);
  return {
    ...recipe,
    _id: insertedId,
  };
};

const update = async (id, updates) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: updates });
  return findById(id);
};

const addImage = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const image = `localhost:3000/src/uploads/${id}.jpeg`;
  const recipe = await findById(id);
  const updates = { ...recipe, image };
  const db = await connection();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: updates });
  return updates;
};

const excluse = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await findById(id);
  db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  excluse,
  addImage,
};
