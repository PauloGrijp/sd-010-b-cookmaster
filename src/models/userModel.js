const connection = require('./mongoConnection');

const COLLECTION = 'users';

const getByEmail = async (email) => {
  const db = await connection();
  const emailUser = await db.collection(COLLECTION).findOne({ email });

  return emailUser;
};

const create = async (data) => {
  const db = await connection();
  const createUser = await db.collection(COLLECTION).insertOne({ ...data, role: 'user' });

  return {
    _id: createUser.insertedId,
    name: data.name,
    email: data.email,
    role: 'user',
  };
};

module.exports = {
  getByEmail,
  create,
};