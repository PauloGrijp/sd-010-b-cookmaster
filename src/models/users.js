const jwt = require('jsonwebtoken');
const connection = require('./connection');

const SECRET = 'secret';

const add = async (email, password, nome) => {
  const role = 'user';
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne({
    email,
    password,
    nome,
    role,
  });

  return { user: { name: nome, email, role, _id: insertedId } };
};

const checkEmailUniquity = async (email) => {
  const db = await connection();

  let checkEmail = null;

  checkEmail = await db.collection('users').findOne({ email });

  if (checkEmail) return true;
};

const login = async (email, password) => {
  const db = await connection();

  const user = await db.collection('users').findOne({
    email,
    password,
  });

  if (!user) return null;

  console.log(user);

  const { _id, role } = user;

  console.log(email, password);

  const newToken = jwt.sign(
    {
      email,
      userId: _id,
      role,
    },
    SECRET,
  );
  return newToken;
};

module.exports = {
  add,
  checkEmailUniquity,
  login,
};
