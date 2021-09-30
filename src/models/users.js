const connect = require('./connection');

const createUser = async (name, email, password) => {
  const db = await connect();
  const user = await db
    .collection('users')
    .insertOne({ name, email, password, role: 'user' });
  return user.ops[0];
};

const findUser = async (email) => {
  const db = await connect();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  createUser,
  findUser,
};
