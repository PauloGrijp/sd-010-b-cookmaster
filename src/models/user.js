const connect = require('./connection');

const registerUser = async (name, email, password) => {
  const db = await connect();
  const userCreated = await db.collection('users').insertOne({ name, email, password });
  const user = userCreated.ops[0];
  delete user.password;
  user.role = 'user';
  user.userId = userCreated.insertedId;
  return { user };
};

const findEmail = async (email) => {
  const db = await connect();
  const userData = await db.collection('users').findOne({ email });
  return userData;
};

const findUser = async (name) => {
  const db = await connect();
  const userData = await db.collection('users').findOne({ name });
  return userData;
};

module.exports = { registerUser, findEmail, findUser };