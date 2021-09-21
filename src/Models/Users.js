const connection = require('./connection');

const newUser = async (name, email, password, role) => 
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => result.ops[0]);

const findByEmail = async (email) => 
  connection()
    .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  newUser,
  findByEmail,
};
