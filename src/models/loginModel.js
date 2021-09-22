const connection = require('./connection');

const USERS = 'users';

const findUser = async (email) => {
  const db = await connection();
  const userFound = await db.collection(USERS).findOne({ email });

  if (!userFound) return null;

  return userFound;
};

module.exports = {
  findUser,
};