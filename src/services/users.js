const jwt = require('jsonwebtoken');
const modelsUsers = require('../models/users');

const SECRET = '9a44d69c7ad2a9395bdd7d4fbf6fdd2d';

const jwtConfig = {
  expiresIn: '10m',
  algorithm: 'HS256',
};

const findUser = async (email, password) => {
  const userSearch = await modelsUsers.getUserByEmail(email);

  if(!userSearch || userSearch.password !== password) return null;

  const { password: _, ...userWithoutPassword } = userSearch;

  const token = jwt.sign(userWithoutPassword, SECRET, jwtConfig);

  return { token };
}

const userIsValid = (name, email, password) => {
  if(!name || !email || !password) return false;

  return email.match(/^[\w.]+@[\w]+(.[\w]+)+$/);
};

const createUser = async (name, email, password) => {
  const user = await modelsUsers.getUserByEmail(email);

  if(!userIsValid(name, email, password)) return 'invalid entry';

  if(user) return 'user exists';

  return createUser(name, email, password);
};

module.exports = {
  createUser,
  findUser,
};
