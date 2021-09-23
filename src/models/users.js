const connection = require('./connection');

const modelUserReg = async (userData) => {
  const { name, email, password, role = 'user' } = userData;
  const db = await connection();
  const users = await db.collection('users').insertOne({ name, email, password, role });
return { code: 201, user: { _id: users.insertedId, name, email, role } };
};

const modelEmailVerifier = async (email) => {
  const db = await connection();
  return db.collection('users').findOne({ email });
};

module.exports = {
  modelUserReg,
  modelEmailVerifier,
};