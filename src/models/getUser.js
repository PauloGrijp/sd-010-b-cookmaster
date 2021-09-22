const { getConnection } = require('./connection');

const getUser = async ({ email, password }) => {
const user = await getConnection()
  .then((db) => db.collection('users').findOne({ email, password }));
return user;
};

module.exports = getUser;