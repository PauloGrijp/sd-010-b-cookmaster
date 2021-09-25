const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const create = async (recipe, id) => {
  const { insertedId, ops } = await connection()
  .then((db) => db.collection('recipes').insertOne({ ...recipe, userId: id }));

  return { recipe: { ...ops[0], _id: insertedId } };
};

const getAll = async () => connection()
.then((db) => db.collection('recipes').find().toArray());

const findById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  const result = await connection()
  .then((db) => db.collection('recipes').findOne(new ObjectId(id)));
  return result;
};

const update = async (id, { name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) { return null; }
  await connection()
  .then((db) => db.collection('recipes')
  .updateOne({ _id: new ObjectId(id) }, { $set: { name, ingredients, preparation } }));
  const result = await findById(id);
  return result;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  await connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: new ObjectId(id) }));
};

const image = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  await connection()
  .then((db) => db.collection('recipes').updateOne({ _id: new ObjectId(id) },
   { $set: { image: `localhost:3000/src/uploads/${id}.jpeg` } }));
  const result = await findById(id);
  return result;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
  image,
};