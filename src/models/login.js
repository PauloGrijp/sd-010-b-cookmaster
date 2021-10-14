const connection = require('./connection');

exports.loginUser = async (user) => {
  const db = await connection();
  const { email } = user;
  return db.collection('users').findOne({ email });
};
