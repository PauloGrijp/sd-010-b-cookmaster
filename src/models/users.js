const connection = require('./connection');

const createUser = async (name, email, password, role = 'user') => {
  const db = await connection();
  const newUser = await db.collection('users')
    .insertOne( { name, email, password, role } );
  
  const { insertedId } = newUser;

  return { user: { name, email, role, _id: insertedId } };
};

const getUserByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users')
    .findOne({ email });
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
};
