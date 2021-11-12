const connection = require('./connection');

const loginValidate = async ({ email, password }) => {
  const db = await connection.getConnection();
  const login = await db.collection('users').findOne({ email, password });
  return login;
};

module.exports = { loginValidate };
