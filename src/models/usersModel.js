const connection = require('./connection');

const userExists = async (email) => {
  const db = await connection.getConnection();
  const searchedEmail = await db.collection('users').findOne({ email });

  return searchedEmail !== null;
};

const registerNewUser = async (info) => {
  const { name, email, password } = info;
  const role = 'user';
  const db = await connection.getConnection();
  const registeredUser = await db.collection('users').insertOnde({ name, email, password, role });

  return registeredUser;
};

module.exports = {
  registerNewUser,
  userExists,
};