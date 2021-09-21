const connection = require('./connection');

const getUserByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }))
    .then((result) => result);

  return user;
};

const createUserData = async (name, email, password) => {
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

const createAdminData = async (name, email, password) => {
  const { insertedId } = await connection().then((db) =>
  db.collection('users').insertOne({ name, email, password, role: 'admin' }));

return {
  user: {
    name,
    email,
    role: 'admin',
    _id: insertedId,
  },
};
};

module.exports = {
  getUserByEmail,
  createUserData,
  createAdminData,
};
