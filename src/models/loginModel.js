const connection = require('./connection');

const findUser = async (loginData) => {
  const { email } = loginData;
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  findUser,
};