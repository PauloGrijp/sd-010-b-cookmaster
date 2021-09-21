const connection = require('./connection');

const findUser = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

const addUser = async (name, email) => {
  const db = await connection();

  const user = await db.collection('users').insertOne({
    name,
    email,
    role: 'user',
  });

  return {
    user: {
      _id: user.insertedId,
      name: user.ops[0].name,
      email: user.ops[0].email,
      role: user.ops[0].role,
    },
  };
};

module.exports = { addUser, findUser };
