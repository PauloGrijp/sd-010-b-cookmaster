const { getConnection } = require('./connection');

const createUser = async ({ name, email, password }) => {
  const db = await getConnection();
  const role = 'user';
  const userCreated = await db.collection('users').insertOne({ name, email, password, role });
  return userCreated.ops[0];
};

const findMail = async ({ email }) => {
  const db = await getConnection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = { 
  createUser,
  findMail,
};
