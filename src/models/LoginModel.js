const { connection } = require('./connection');

const findUser = async (username, password) => {
  const userCollection = await connection()
  .then((db) => db.collection('users').findOne({ username, password }));
  
  return userCollection;
};

module.exports = {
  findUser,
};