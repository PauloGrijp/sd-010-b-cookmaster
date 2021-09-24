const connect = require('./connection');

const findLogin = async ({ email, password }) => {
  const db = await connect();
  const userEmailPassword = await db.collection('users').findOne({ email, password });
  return userEmailPassword;
};

module.exports = {
  findLogin,
};