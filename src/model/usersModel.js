const connection = require('./connection');

const getByEmail = async (email) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('users').findOne({ email });
  return result;
};

const createUser = async (users) => {
  const { name, email, password } = users;
  const auxConnection = await connection();
  const result = await auxConnection.collection('users')
  .insertOne({ name, email, password, role: 'user' });
  return { role: result.ops[0].role, id: result.insertedId };
};

module.exports = { createUser, getByEmail };