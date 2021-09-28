const { getConnection } = require('./connection');

const login = async ({ email, password }) => {
  const db = await getConnection();
  return db.collection('users').findOne({
    email,
    password,
  });
};

module.exports = {
  login,
};