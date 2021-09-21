const connection = require('./connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne(
    { name, email, password, role: 'user' },
  );
  const { insertedId } = newUser;

  return { user: { _id: insertedId, name, email, role: 'user' } };
};

const checkExist = async (email) => {
  const db = await connection();
  const searchResponse = await db.collection('users').findOne({ email });
  return searchResponse !== null;
};

module.exports = {
  createUser,
  checkExist,
};
