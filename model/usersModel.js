const connection = require('./connection');

const addUsers = async (name, email, password) => {
  const add = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));
  return add;
  };

const findByEmail = async (email) => { 
  const find = await connection().then((db) => db.collection('users').findOne({ email }));
  return find;
};

module.exports = {
  addUsers,
  findByEmail,
};