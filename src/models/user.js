const { getConnection } = require('../connection/connection');

const USERS_COLLECTION = 'users';

const createUser = async (body) => {
  const connect = await getConnection();
  const db = await connect.collection(USERS_COLLECTION).insertOne(body);
  
  return db.ops[0];
};

const getByName = async ({ name }) => {
  const connect = await getConnection();
  const query = await connect.collection(USERS_COLLECTION).findOne({ name });

  return query;
};

module.exports = {
  createUser,
  getByName,
};
