const { validateInput, validateLogin, validateCredential } = require('../middlewares/validateUser');
const { create } = require('../model/usersModel');
const { validateEmailExist } = require('./validationUser');

const conflictError = 409;

const createUser = async ({ name, email, password }, res) => {
  const emailExist = await validateEmailExist(email);
  await validateInput(email, name, password, res);
  if (emailExist) res.status(conflictError).json(emailExist);

  const user = await create(name, email, password);
  return user;
};

const loginUser = async ({ email, password }, res) => {
  await validateLogin(email, password, res);
  await validateCredential(email, password, res);
};
module.exports = { createUser, loginUser };
