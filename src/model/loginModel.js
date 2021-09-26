const connection = require('./connection');

const getByPassword = async (password) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('users').findOne({ password });
  return result;
};

module.exports = getByPassword;
