const jwt = require('jsonwebtoken');
const UserModel = require('../models/users.model');

const UserValidation = require('../schemas/users.schema');

const SECRET = 'vqvtrybe';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '10m',
};

const createUser = async (name, email, password, role) => {
  UserValidation.validationCreateUser(name, email, password);
  await UserValidation.userExists(email);
  const newUser = await UserModel.createUser(name, email, password, role);
  return newUser;
};

const login = async (email, password) => {
  UserValidation.validationLogin(email, password);
  const user = await UserModel.getUserByEmail(email, password);
  if (!user) {
    const error = new Error('Incorrect username or password');
    error.code = 401;
    throw error;
  }
  const { _id } = user;
  const payload = { _id, email: user.email, role: user.role };
  const token = jwt.sign(payload, SECRET, jwtConfig);
  return token;
};

module.exports = { createUser, login };