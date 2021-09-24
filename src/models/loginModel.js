const connect = require('./connection');

const getUserByEmail = async (email) => {
  const db = await connect();
  const result = await db.collection('users').findOne({ email });
  return result;
};

const getPassword = async (password) => {
  const db = await connect();
  const result = await db.collection('users').findOne({ password });
  return result;
};

const createLogin = async (email, password) => {
  const db = await connect();
  const result = await db.collection('users').insertOne({ email, password });
  return result;
};

module.exports = {
  getPassword,
  createLogin,
  getUserByEmail,
};
