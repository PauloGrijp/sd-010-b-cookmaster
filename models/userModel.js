const connection = require('./connection');

const create = async (name, email) => {
  const db = await connection();
  
  const createdUser = {
    name,
    email,
    role: 'user',
  };

  await db.collection('users').insertOne(createdUser);
  
  return { user: createdUser };
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