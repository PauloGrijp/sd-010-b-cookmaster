const getConnection = require('./connection');

const createUserM = async (email, password, name, role) =>
  getConnection()
    .then((db) => db.collection('users').insertOne({ email, password, name, role }))
    .then((result) => result.ops[0]);
const checkEmailM = async (email) =>
  getConnection()
    .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  createUserM,
  checkEmailM,
};
