const connection = require('./connection');

const users = 'users';

const existsEmail = async (email) => {
  const db = await connection();
  const result = await db.collection(users).findOne({ email });
  return !!(result);
};

const create = async ({ name, email, password, role = 'user' }) => {
  const db = await connection();
  const result = await db.collection(users).insertOne({ name, email, password, role });
  const { _id } = result.ops[0];
  return { _id, email, name, role };
};

const validUser = async ({ email, password }) => {
  const db = await connection();
  const result = await db.collection(users).findOne({ email, password });
  if (result) {
    const { _id, role } = result;
    return { _id, email, role };
  }
  return false;
};

module.exports = {
  existsEmail,
  create,
  validUser,
};
