const connection = require('./connection');

const modelUserReg = async (user) => {
  const db = await connection();
  const users = await db.collection('users').insertOne({ user });
return { code: 201, users: { _id: users.insertedId, user } };
};

module.exports = {
  modelUserReg,
};