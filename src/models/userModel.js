const connect = require('./connection');

require('dotenv').config();

const getUserByEmail = async (email) => {
  const db = await connect();
  const result = db.collection(process.env.COLLECTION).findOne({ email });
  return result;
};

const createUser = async (name, email, password, role) => {
  const db = await connect();
  const result = db.collection(process.env.COLLECTION).insertOne({ name, email, password, role });
  return result;
};

module.exports = {
  getUserByEmail,
  createUser,
};