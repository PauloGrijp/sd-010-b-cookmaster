const connection = require('./mongoConnection');

const createNewUser = async ({ name, email, password }) => {
  const db = await connection();
  const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  const { insertedId } = JSON.parse(user);
  return { user: { _id: insertedId, name, email, role: 'user' } };
};

module.exports = { createNewUser };
