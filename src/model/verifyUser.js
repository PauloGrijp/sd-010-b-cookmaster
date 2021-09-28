const connect = require('./connection');

const userExists = async ({ email }) => {
  const db = await connect();
  const nameUser = await db.collection('users').findOne({ email });

  return nameUser;
};

module.exports = { userExists };