const { getConnection } = require('./connection');

const findUser = async ({ email, password }) => {
  const db = await getConnection();
  const user = db.collection('users').findOne({ email, password });

  return user;
};

module.exports = {
  findUser,
};