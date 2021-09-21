const ErrorRequest = require('../helpers/errorRequest');
const connection = require('./connection');

const users = 'users';

const existsEmail = async (email) => {
  const db = await connection();
  const result = await db.collection(users).findOne({ email });
  return !!(result);
};

const create = async ({ name, email, password }) => {
  const db = await connection();
  const result = await db.collection(users).insertOne({ name, email, password, role: 'user' });
  const { _id, role } = result.ops[0];
  return { _id, email, name, role };
};

module.exports = {
  existsEmail,
  createUser,
};
