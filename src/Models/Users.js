const connection = require('./connection');

const newUser = async (name, email, password, role) => 
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => result.ops[0]);

const findUser = async (email, password) => {
  const query = password ? { email, password } : { email };
  return connection()
  .then((db) => db.collection('users').findOne(query));
};
  
module.exports = {
  newUser,
  findUser,
};
