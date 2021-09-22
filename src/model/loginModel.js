const connect = require('./connection');

const userLogin = async (email) => {
  const db = await connect();
  const login = await db.collection('users').findOne({ email });

  return login;
};

module.exports = { userLogin };