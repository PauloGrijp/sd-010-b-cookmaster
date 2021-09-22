const connection = require('./mongoConnections');

const userByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

const addUser = async (name, email, password) => {
  const db = await connection();
  const result = await db.collection('users')
  .insertOne({ name, email, password, role: 'user' });
  const user = result.ops[0];
  return { user };
};

const userByAll = async () => {
  const db = await connection();
  const result = await db.collection('users').find();
  return result;
};

module.exports = {
  userByEmail,
  addUser,
  userByAll,

};