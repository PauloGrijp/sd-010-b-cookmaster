const jwt = require('jsonwebtoken');
const connection = require('./connection');

const SECRET = 'secret';

const add = async (email, senha, nome) => {
  const role = 'user';
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne({
    user: {
      email,
      senha,
      nome,
      role,
    },
  });

  return { user: { name: nome, email, role, _id: insertedId } };
};

const checkEmailUniquity = async (email) => {
  const db = await connection();

  let checkEmail = null;

  checkEmail = await db.collection('users').findOne({ 'user.email': email });

  if (checkEmail) return true;
};

const login = async (email, password) => {
  const db = await connection();

  const user = await db.collection('users').findOne({
    'user.email': email,
    'user.senha': password,
  });

  if (!user) return null;

  const newToken = jwt.sign(
    {
      email,
      password,
    },
    SECRET,
  );
  return newToken;
};

module.exports = {
  add,
  checkEmailUniquity,
  login,
  SECRET,
};
