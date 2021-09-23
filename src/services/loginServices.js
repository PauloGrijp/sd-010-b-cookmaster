const loginModels = require('../models/loginModels');
const { CODE_HTTP } = require('../helpers/responses');

const login = async ({ email, password }) => {
  const resultModel = await loginModels.login({ email, password });
  if (!resultModel) return CODE_HTTP.UNAUTHORIZED;
  return resultModel;
};

module.exports = {
  login,
};