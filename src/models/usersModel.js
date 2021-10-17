const getConnection = require('./connection');

const collection = 'users';

async function checkLogin({ email, password }) {
  const db = await getConnection();
  const user = await db.collection(collection).findOne({ email, password });
  return user;
}

async function getByEmail(email) {
  const db = await getConnection();
  const result = await db.collection(collection).findOne({ email });
  return result;
}

async function create({ name, email, password }) {
  const db = await getConnection();
  const result = await db
    .collection(collection)
    .insertOne({ name, email, password });
  return { user: { _id: result.insertedId, name, email, role: 'user' } };
}

async function newAdmin({ email, password, name }) {
  const db = await getConnection();
  const admin = await db
    .collection(collection)
    .insertOne({ name, email, password, role: 'admin' });
  return {
    user: {
      name,
      email,
      role: 'admin',
      _id: admin.insertedId,
    },
  };
}

module.exports = {
  create,
  getByEmail,
  checkLogin,
  newAdmin,
};
