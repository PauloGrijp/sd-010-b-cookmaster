// const { ObjectID } = require('mongodb');
const getConnection = require('./connection');

const findByEmail = async (email) => {
  const productsCollection = await getConnection()
    .then((db) => db.collection('users'));

  const response = await productsCollection
    .findOne({ email });

  return response;
};

const create = async (name, email, password, role) => {
  const productsCollection = await getConnection()
    .then((db) => db.collection('users'));

  const response = await productsCollection
    .insertOne({ name, email, password, role });

  return {
    user: {
      _id: response.insertedId,
      name,
      email,
      role,
    },
  };
};

module.exports = {
  create,
  findByEmail,
};