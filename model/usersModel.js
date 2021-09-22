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

const findByName = async (name) => { 
  const find = await connection().then((db) => db.collection('users').findOne({ name }));
  return name && find;
};

module.exports = {
  addUsers,
  findByEmail,
  findByName,
};