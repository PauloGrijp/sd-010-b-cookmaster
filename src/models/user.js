const { getConnection } = require('../connection/connection');

const USERS_DOCUMENTS = 'users';

const createUser = async (body) => {
  const connect = await getConnection();
  const db = await connect.collection(USERS_DOCUMENTS).insertOne(body);
  
  return db.ops[0];
};

const getByName = async ({ name }) => {
  const connect = await getConnection();
  const query = await connect.collection(USERS_DOCUMENTS).findOne({ name });

  return query;
};

module.exports = {
  createUser,
  getByName,
};
