const connect = require('./connection');

const creatUser = async ({ name, email, password, role }) => {
  const db = await connect();
  const { insertedId: id } = await db.collection('users')
  .insertOne({ name, email, password, role });
  return { id, name, email, password, role };
};

const findByEmail = async (email) => {
  const db = await connect();
  const userByEmail = await db.collection('users').findOne({ email });
  return userByEmail;
};

const findLogin = async ({ email, password }) => {
  const db = await connect();
  const userEmailPassword = await db.collection('users').findOne({ email, password });
  return userEmailPassword;
};

module.exports = {
  creatUser,
  findByEmail,
  findLogin,
};
