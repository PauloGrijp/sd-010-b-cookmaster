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
  return { user: result[0] };
};

module.exports = {
  userByEmail,
  addUser,

};