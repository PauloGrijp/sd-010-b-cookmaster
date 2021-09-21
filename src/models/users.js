const connection = require('./connection');

async function findUser(email) {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
}

async function newUser(name, email, password, role) {
  const db = await connection();
  const result = await db.collection('users').insertOne({ name, email, password, role });
  return result.ops[0];
}

module.exports = {
  findUser,
  newUser,
};
