const connection = require('./conection');

const getUserByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }))
    .then((result) => result);

  return user;
};

const create = async (name, email, password) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));

  return {
    user: {
      name,
      email,
      role: 'user',
      id: insertedId,
    },
  };
};

const getPassword = async (email) => {
  const user = await getUserByEmail(email);
  const { password } = user;
  return password;
};

module.exports = { create, getUserByEmail, getPassword };
