const { getConnection } = require('./connection');

const getUser = async ({ email, password }) => {
const user = await getConnection()
  .then((db) => db.collection('users').findOne({ email, password }));
  console.log(password);
return user;
};

module.exports = getUser;