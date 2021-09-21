const connection = require('./connection');

const USERS = 'users';

const create = async ({ name, email, password }) => {
  const newUser = {
    name,
    email,
    password,
    role: 'user',
  };

  const db = await connection();
  const { insertedId } = await db.collection(USERS).insertOne(newUser);

  return {
    user: {
      _id: insertedId,
      ...newUser,
    },
  };
};

module.exports = {
  create,
};
