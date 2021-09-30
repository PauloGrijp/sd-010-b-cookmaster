const connection = require('./mongoConnection');

const create = async (name, email) => {
  const db = await connection();

  const newUser = { name, email, role: 'user' };

  await db.collection('users').insertOne(newUser);

  return { user: newUser };
};

const getUserByEmail = async (userEmail) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email: userEmail });

  if (!user) return false;

  return true;
};

module.exports = {
  create,
  getUserByEmail,
};