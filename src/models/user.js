const connection = require('./connection');

const create = async (user) => {
  const db = await connection();
  const userAdd = await db
    .collection('users')
    .insertOne(user);

  return userAdd.ops[0];
};

module.exports = { create };
