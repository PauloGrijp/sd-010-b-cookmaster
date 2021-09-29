const jwt = require('jsonwebtoken');
const { findUserByEmail, create } = require('../models/userModel');

const SECRET = 'senha1337';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const findUser = async (email, password) => {
  const userSearch = await findUserByEmail(email);

  if (!userSearch || userSearch.password !== password) return null;

  const { password: _, ...userWithoutPassword } = userSearch;

  const token = jwt.sign(userWithoutPassword, SECRET, jwtConfig);

  return { token };
};

const userIsValid = (name, email, password) => {
  if (!name || !email || !password) return false;

  return email.match(/^[\w.]+@[\w]+(.[\w]+)+$/);
};
const createUser = async ({ name, email, password }) => {
  const user = await findUserByEmail(email);

  if (!userIsValid(name, email, password)) return 'invalid entry';

  if (user) return 'user exists';

  return create(name, email, password);
};

module.exports = {
  createUser,
  findUser,
};
