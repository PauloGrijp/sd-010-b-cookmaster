const connect = require('./connection');

const userExists = async ({ email, password }) => {
  const db = await connect();
  const nameUser = await db.collection('users').findOne({ email, password });

  return nameUser;
};

module.exports = { userExists };