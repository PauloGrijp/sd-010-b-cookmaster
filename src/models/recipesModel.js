const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (body) => {
  const data = await connection()
    .then((db) => db.collection('recipes').insertOne(body));
  return data;
};

const getAll = async () => {
  const data = await connection()
  .then((db) => db.collection('recipes').find().toArray());
  return data;
};

const getById = async (id) => {
  const data = await connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return data;
};

const update = async (id, body) => {
  const data = await connection()
  .then((db) => db.collection('recipes').updateOne({ _id: id }, { $set: body }));
  return data;
};

const deleteId = async (id) => {
  const data = await connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: id }));
  return data;
};

const insertImage = async (id) => {
  const data = await connection()
  .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, 
    { $set: { image: `localhost:3000/src/uploads/${id}.jpeg` } }));
  return data;
};

module.exports = {
  create,
  getAll,
  insertImage,
  deleteId,
  getById,
  update,
};
