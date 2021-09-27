const { connection } = require('./connection');

const create = async (name, email, password, role) => {
  const createUser = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));

  return {
    name,
    email,
    role: 'user',
    id: createUser.insertedId,
  };
};

const findEmail = async (email) => {
  const foundEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  if (!foundEmail) return null;

  return foundEmail;
};

module.exports = {
  create,
  findEmail,
};