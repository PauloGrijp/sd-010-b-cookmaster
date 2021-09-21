const jwt = require('jsonwebtoken');
const model = require('../models/userModel');
const schema = require('../schemas/userSchema');

const secret = 'segredoSuperSecreto';

const createNewUser = async (name, email, password) => {
  const validation = await schema.validateCreateUser(name, email, password);
  if (validation.err) return validation;
  const createdUser = await model.createNewUser(name, email, password);
  return createdUser;
};

const login = async (email, password) => {
  const validate = await schema.validateLoginInput(email, password);
  if (validate.err) return validate;
  const validateLogin = await schema.validateLogin(email, password);
  if (validateLogin.err) return validateLogin;
  const { _id, email: dataEmail, role } = validate;
  const payload = { _id, dataEmail, role };
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: payload }, secret, jwtConfig);
  return { token };
};

module.exports = {
  createNewUser,
  login,
};
