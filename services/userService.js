const jwt = require('jsonwebtoken');
const UsersModel = require('../models/userModel');

const secret = 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const validateFieldsCreate = (name, email, password) => {
  if (!name || !email || !password) return false;
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) return false;

  return true;
};

const validateFieldsLogin = (email, password) => {
  if (!email || !password) return false;

  return true;
};

const formatEmailLogin = (email) => {
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) return false;

  return true;
};

const createUser = async ({ name, email, password }) => {
  const emailExists = await UsersModel.emailExists(email);
  const validation = validateFieldsCreate(name, email, password);

  if (emailExists) return null;
  if (!validation) return false;

  return UsersModel.create({ name, email, password });
};

const loginUser = async ({ email, password }) => {
  const validation = validateFieldsLogin(email, password);
  const userSearch = await UsersModel.login({ email, password });

  if (!validation) return false;

  if (!userSearch || userSearch.password !== password) return null;

  const { _id: id } = userSearch;
  const userWithoutPassword = {
    id,
    email,
    role: 'user',
  };

  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);

  return token;
};

module.exports = {
  createUser,
  formatEmailLogin,
  loginUser,
};