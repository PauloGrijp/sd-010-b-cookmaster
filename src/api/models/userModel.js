const connection = require('./connection');

async function emailExists(email) {
  const db = await connection();

  const result = await db.collection('users').findOne({ email });

  return result;
}

async function create(body) {
  const { name, email, password } = body;
  const db = await connection();

  const collection = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });

  const user = collection.ops[0];
  delete user.password;
  return {
    user,
  };
}

module.exports = {
  create,
  emailExists,
};