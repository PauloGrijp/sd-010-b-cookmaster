const connection = require('./connection');

const create = async (name, email, password) => {
  const db = await connection();
  
  const createdUser = {
    name,
    email,
    password,
    role: 'user',
  };

  await db.collection('users').insertOne(createdUser);
  
  return { user: { name, email, role: 'user' } };
};

const getUserByEmail = async (userEmail) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email: userEmail });

  if (!user) return false;

  return true;
};

const findUser = async (userEmail) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email: userEmail });
  return user;
};

module.exports = {
  create,
  getUserByEmail,
  findUser,
};