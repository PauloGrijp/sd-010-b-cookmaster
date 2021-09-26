// const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function registerUser(name, email, password) {
  const newUser = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));

    return {
      user: {
        name,
        email,
        role: 'user',
        _id: newUser.insertedId,
      },
    };
}

async function getByUser(email) {
  const findUser = await connection()
    .then((db) => db.collection('users').findOne({ email }));

    return findUser;
}

module.exports = {
  registerUser,
  getByUser,
};
