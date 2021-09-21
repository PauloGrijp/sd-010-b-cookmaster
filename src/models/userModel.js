const mongoConnection = require('./connection');

const create = async ({ name, email, password, role }) => {
    const usersCollection = await mongoConnection.getConnection()
      .then((db) => db.collection('users'));
  
    const createdUser = await usersCollection.insertOne({ name, email, password, role });
    return {
      name,
      email,
      password,
      role,
      id: createdUser.insertedId,
    };
  };

const findByEmail = async (email) => {
  const userCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users').findOne({ email }));

  return userCollection;  
};

const findById = async (id) => {
  const userCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes').findOne({ id }));

  return userCollection;  
};

const findUser = async ({ email, password }) => {
  const userCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users').findOne({ email, password }));
  return userCollection;  
};

  module.exports = { create, findByEmail, findUser, findById };
