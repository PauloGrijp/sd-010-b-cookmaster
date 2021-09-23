const connection = require('./connection');

const postUser = async (name, email, password) => connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));

const findEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

const checkEmailPassword = async (email, password) => connection()
  .then((db) => db.collection('users').findOne({ email, password }));

module.exports = { postUser, findEmail, checkEmailPassword };
