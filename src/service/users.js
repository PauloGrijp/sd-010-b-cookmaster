const jwt = require('jsonwebtoken');
const { findUserByEmail, create } = require('../model/users');

const SECRET = 'senhaUltraSecreta';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const getByUser = async (email, password) => {
  const userSearch = await findUserByEmail(email);
  if (!userSearch || userSearch.password !== password) return null;
  const { password: _, ...userWithoutPassword } = userSearch;
  const token = jwt.sign(userWithoutPassword, SECRET, jwtConfig);
  return { token };
};

const validateInput = (name, email, password) => {
  if (!name || !email || !password) return false;
  return email.match(/^[\w.]+@[\w]+(.[\w]+)+$/);
};

const createNewUser = async ({ name, email, password }) => {
  const user = await findUserByEmail(email);
  if (!validateInput(name, email, password)) return 'error validate';
  if (user) return 'user exists';
  return create(name, email, password);
};

module.exports = {
  createNewUser,
  getByUser,
};