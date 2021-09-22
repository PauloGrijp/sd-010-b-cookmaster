const { createToken } = require('../utils/token');
const model = require('../Models/Users');
const utils = require('../validations/users');

const newUser = async (name, email, password, role) => {
  utils.newUserBodyValidation(name, email, password);
  await utils.alreadyExists(email, model);
  const { password: _, ...result } = await model.newUser(name, email, password, role);
  return result;
};

const login = async (email, password) => {
  utils.validateLoginBody(email, password);
  const user = await model.findUser(email, password);
  utils.checkUserLogin(user);
  const token = createToken(user);
  return token;
};

module.exports = {
  newUser,
  login,
};
