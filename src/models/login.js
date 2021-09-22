const { getConnection } = require('../connection/connection');

const USERS_DOCUMENTS = 'users';

const getUser = async ({ email }) => {
  const connect = await getConnection();
  const findUser = await connect.collection(USERS_DOCUMENTS).findOne({ email });

  return findUser;
};

module.exports = {
  getUser,
};
