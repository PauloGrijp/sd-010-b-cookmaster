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

const login = async (email, password) => {
  const logInto = await connection()
    .then((db) => db.collection('users').findOne({ email, password }));

  // console.log(logInto);
  if (!logInto) return null;

  return {
    id: logInto.insertedId,
    email,
    role: 'user',
  };
};

module.exports = {
  create,
  findEmail,
  login,
};