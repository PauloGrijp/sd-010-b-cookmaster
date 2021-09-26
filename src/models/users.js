const connection = require('./connection');

const emailAlreadyExists = async (email) => {
  const db = await connection();
  const emailExist = await db.collection('users').findOne({ email });
  return emailExist !== null;
};

const createUser = async (name, email, password) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne(
    { name, email, password, role: 'user' },
  );
  const { insertedId } = newUser;

  return { user: { _id: insertedId, name, email, role: 'user' } };
};

module.exports = {
  emailAlreadyExists,
  createUser,
};
