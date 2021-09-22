// const { ObjectId } = require('mongodb');
const { connection } = require('./conncection');

const login = async ({ email, password }) => {
  const db = await connection();
  return db.collection('users').findOne({ email, password });
};

module.exports = {
  login,
};