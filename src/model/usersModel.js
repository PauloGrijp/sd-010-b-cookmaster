const getConnection = require('./connection');

const createUserM = async (email, password, name, role) =>
  getConnection()
    .then((db) => db.collection('users').insertOne({ email, password, name, role }))
    .then((result) => result.ops[0]);
const checkEmailM = async (email, password) => {
  const getEmail = password ? { email, password } : { email };
  return getConnection()
    .then((db) => db.collection('users').findOne(getEmail));
};

module.exports = {
  createUserM,
  checkEmailM,
};
