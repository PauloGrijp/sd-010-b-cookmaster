const connect = require('./connection');

const userExists = async (email) => {
  const db = await connect();
  const nameUser = await db.collection('users').findOne({ email });

  return nameUser;
};

const add = async (name, email, password) => {
  const db = await connect();
  const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  return {
  user: { _id: user.insertedId,
    name: user.ops[0].name,
    email: user.ops[0].email,
    role: user.ops[0].role,
  },
};
};

module.exports = { add, userExists };