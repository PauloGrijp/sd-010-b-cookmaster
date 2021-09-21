const { ObjectId } = require('mongodb');
const connectionMongo = require('./connection');

const create = async (name, email, password, role) => {
  const db = await connectionMongo();
  const user = await db.collection('users').insertOne({ name, email, password, role });
  return { id: user.insertedId, name, email, password, role };
};
 
const getAll = async () => {
  const db = await connectionMongo();
  const users = await db.collection('users').find().toArray();
  return { users }; 
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null; 
  const db = await connectionMongo();
  const user = await db.collection('users').findOne({ _id: ObjectId(id) });
  return user;
};

// const update = async (id, name, quantity) => {
//   if (!ObjectId.isValid(id)) return null;
//   const db = await connectionMongo();
//   await db.collection('users')
//     .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
//   return { id, name, quantity };
// };

// const remove = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   const db = await connectionMongo();
//   const product = await db.collection('users').findOne({ _id: ObjectId(id) });
//   await db.collection('users').deleteOne({ _id: ObjectId(id) });
//   return product;
// };

module.exports = { create, getAll, getById };
