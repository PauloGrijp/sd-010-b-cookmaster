const models = require('../models/modelUsers');
const validations = require('../utils/validations/validationsLogin');
const generateToken = require('../utils/generateToken');

const login = async ({ email, password }) => {
  validations.loginEmail(email);
  validations.loginPassword(password);
  await validations.loginConfirmUser(email, password);

  const user = await models.getByEmail(email);
  const token = generateToken(user);
  return ({ status: 200, token });
};

module.exports = { login };
