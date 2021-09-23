const connection = require('./connection');

const userExists = async (email) => {
  const db = await connection.getConnection();
  const searchedEmail = await db.collection('users').findOne({ email });

  if (searchedEmail) return true;
  return false;
};

const registerNewUser = async (info) => {
  const { name, email, password } = info;
  const role = 'user';
  const db = await connection.getConnection();
  const registeredUser = await db.collection('users').insertOne({ name, email, password, role });

  return { user: { _id: registeredUser.insertedId, name, email, role } };
};

const getUserByEmail = async (email) => {
  const db = await connection.getConnection();
  const searchedEmail = await db.collection('users').findOne({ email });

  if (searchedEmail) return searchedEmail;
  return false;
};

module.exports = {
  registerNewUser,
  userExists,
  getUserByEmail,
};