const { getConnection } = require('./connection');

const registerUsers = async (name, email, password) => {
  const db = await getConnection();
  const users = await db.collection('users')
  .insertOne({ name, email, password, role: 'user' });
  return { user: {
    name,
    email,
    role: 'user',
    _id: users.insertedId,
  },
  };
};

const findByEmail = async (email) => {
  const db = await getConnection();
  const findEmail = await db.collection('users')
  .findOne({ email });
  return findEmail !== null;
};

const checkLogin = async (email, password) => {
  const db = await getConnection();
  const verifyEmail = await db.collection('users').findOne({ email, password });
  return verifyEmail; 
};

const registerAdmin = async (email, password, name) => {
  const db = await getConnection();
  const admin = await db.collection('users')
  .insertOne({ name, email, password, role: 'admin' });
  return { user: {
    name,
    email,
    role: 'admin',
    _id: admin.insertedId,
  },
  };
};

module.exports = {
   registerUsers,
  findByEmail, 
  checkLogin,
  registerAdmin,
};