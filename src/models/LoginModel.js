const { connection } = require('./connection');

const findUser = async ({ email, password }) => {
  const userCollection = await connection()
  .then((db) => db.collection('users').findOne({ email, password }));
  
  return userCollection; 
};

module.exports = {
  findUser,
};