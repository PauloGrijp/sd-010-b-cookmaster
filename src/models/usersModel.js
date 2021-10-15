const { ObjectID } = require('mongodb');
const mongoConnection = require('./connection');

const createUser = async (name, email, password, role = 'user') => {
  const usersCollection = await mongoConnection.connection()
  .then((db) => db.collection('users'));

  const { insertedId: id } = await usersCollection.insertOne({ name, email, password, role });

  return {
    _id: id,
    name,
    email,
    password,
    role,
  };
};

const findUserByName = async (name) => {
  const usersCollection = await mongoConnection.connection()
  .then((db) => db.collection('users'));

  const user = await usersCollection.findOne({ name });

  return user;
};

const findUserById = async (id) => {
  const usersCollection = await mongoConnection.connection()
  .then((db) => db.collection('users'));

  const user = await usersCollection.findOne({ _id: ObjectID(id) });

  return user;
};

const findUserByEmail = async (email) => {
  const usersCollection = await mongoConnection.connection()
  .then((db) => db.collection('users'));

  const user = await usersCollection.findOne({ email });

  return user;
};

const getAllUsers = async () => {
  const usersCollection = await mongoConnection.connection()
  .then((db) => db.collection('users'));

  const allUsers = await usersCollection.find()
  .toArray();

  return allUsers;
};

const deleteUserById = async (id) => {
  const usersCollection = await mongoConnection.connection()
  .then((db) => db.collection('users'));

  const { deletedCount } = await usersCollection.deleteOne({ _id: ObjectID(id) });

  return deletedCount;
};

module.exports = {
  createUser,
  findUserByName,
  findUserById,
  getAllUsers,
  deleteUserById,
  findUserByEmail,
};
