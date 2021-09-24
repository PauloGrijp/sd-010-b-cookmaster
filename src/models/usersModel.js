const connection = require('./conection');

const findEmail = async (email) => {
  const db = await connection();
  return db.collection('users').findOne({ email });
};

const create = async (user) => {
  const { name, email, password } = user;
  const role = 'user';
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne({ name, email, password, role });
  return {
    name,
    email,
    role,
    _id: insertedId,
  };
};

module.exports = {
  findEmail,
  create,
};