const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((recipes) => ({ recipes }));

const findById = async (id) => (
  ObjectId.isValid(id)
  ? connection()
  .then((db) => db.collection('recipes').findOne(new ObjectId(id)))
  : null
);

const create = async (recipe) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipe }))
    .then((result) => ({ recipe: result.ops[0] }));
  
const update = async (id, recipe) =>
  connection()
    .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { ...recipe } }))
    .then(() => ({ _id: id, itensSold: recipe }));
  
const remove = async (id) =>
  connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};