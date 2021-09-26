const connection = require('./connection');

const getUser = async (userEmail) => {
  const { insertedId, name, role, email } = connection()
    .then((db) => db.collection('users').findOne({ userEmail }));

  return {
    _id: insertedId,
    name,
    email,
    role,
  };
};

const createUser = async (userData) => 
  connection()
    .then((db) => db.collection('users').insertOne(userData));

module.exports = {
  getUser,
  createUser,
};