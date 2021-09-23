const connection = require('./connection');

const postUser = async (name, email, password) => connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));

const findEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = { postUser, findEmail };
