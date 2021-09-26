const connection = require('./connection');

const create = async (name, email, password) => {
  const role = 'user';
  const db = await connection();
  const user = await db.collection('users').insertOne({ name, email, password, role });
  return { user: { name, email, role, _id: user.insertedId } };
};

const findUserByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  create,
  findUserByEmail,
};
