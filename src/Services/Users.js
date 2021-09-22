const { createToken } = require('../utils/token');
const model = require('../Models/Users');
const valid = require('../validations/users');

const newUser = async (name, email, password, role) => {
  valid.newUserBodyValidation(name, email, password);
  await valid.alreadyExists(email, model);
  const { password: _, ...result } = await model.newUser(name, email, password, role);
  return result;
};

const login = async (email, password) => {
  valid.validateLoginBody(email, password);
  const user = await model.findUser(email, password);
  valid.checkUserLogin(user);
  const token = createToken(user);
  return token;
};

module.exports = {
  newUser,
  login,
};
