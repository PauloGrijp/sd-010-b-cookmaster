const connection = require('./connection');

const findByEmail = async (email) => {
  const db = await connection();
  return db.collection('users').findOne({ email });
};

const create = async (name, email, password, role = 'user') => {
  const user = { name, email, password, role };
  const { password: p, ...result } = user;
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne(user);
  return {
    ...result,
    _id: insertedId,
  };
};

module.exports = {
  create,
  findByEmail,
};
