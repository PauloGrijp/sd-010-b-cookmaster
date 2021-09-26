const connection = require('./connection');

const getUser = async (userEmail) => 
  connection()
    .then((db) => db.collection('users').findOne({ email: userEmail }));

const createUser = async (userData) => 
  connection()
    .then((db) => db.collection('users').insertOne({ ...userData }));

module.exports = {
  getUser,
  createUser,
};