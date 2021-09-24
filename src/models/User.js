const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
    .then((db) => db.collection('users').find().toArray())
    .then((users) => ({ users }));

const findById = async (id) => (
  ObjectId.isValid(id)
  ? connection()
  .then((db) => db.collection('users').findOne(new ObjectId(id)))
  : null
);

const findByMail = async (email) => connection()
    .then((db) => db.collection('users').findOne({ email }));

const create = async ({ name, email, password, role }) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => result.ops.map(({ _id }) => ({ name, email, role, _id })));
  
const update = async (id, name, quantity) =>
  connection()
    .then((db) => db.collection('users')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
    .then(() => ({ _id: id, name, quantity }));
  
const remove = async (id) =>
  connection()
    .then((db) => db.collection('users').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  findByMail,
};