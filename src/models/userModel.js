const connection = require('./connection');

const COLLECTION_NAME = 'users';

const findByEmail = async (email) => {
  const userData = await connection().then((db) => 
    db.collection(COLLECTION_NAME).findOne({ email }));
  return userData;
};

const createNewUser = async (name, email, password) => {
  const dataToInsert = { name, email, password, role: 'user' };
  await connection().then((db) => db.collection(COLLECTION_NAME).insertOne(dataToInsert));
  const createdUser = await findByEmail(email);
  delete createdUser.password;
  return { user: createdUser };
};

module.exports = {
  findByEmail,
  createNewUser,
};