const mongoConnection = require('./connection');

const create = async ({ name, email, password }) => {
    const usersCollection = await mongoConnection.getConnection()
      .then((db) => db.collection('users'));
  
    const createdUser = await usersCollection.insertOne({ name, email, password });
    return {
      name,
      email,
      password,
      id: createdUser.insertedId,
    };
  };

const findByEmail = async (email) => {
  const userCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users').findOne({ email }));

  return userCollection;  
};

  module.exports = { create, findByEmail };
