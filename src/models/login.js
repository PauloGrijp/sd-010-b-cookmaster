const { getConnection } = require('../connection/connection');

const USERS_COLLECTION = 'users';

const getUser = async ({ email }) => {
  const connect = await getConnection();
  const findUser = await connect.collection(USERS_COLLECTION).findOne({ email });

  return findUser;
};

module.exports = {
  getUser,
};
