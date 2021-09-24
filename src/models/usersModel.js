const connection = require('./connection');

const USERS = 'users';

const create = async (name, email, password) => {
  const role = 'user';

  const db = await connection();
  const { insertedId } = await db.collection(USERS).insertOne({ name, email, password, role });

  return {
    user: {
      _id: insertedId,
      name,
      email,
      role,
    },
  };
};

const findByEmail = async (email) => {
  const db = await connection();
  const emailFound = await db.collection(USERS).findOne({ email });

  if (!emailFound) return null;

  return emailFound;
};

module.exports = {
  create,
  findByEmail,
};
