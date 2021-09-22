const loginModels = require('../models/loginModels');
const { CODE_HTTP } = require('../helpers/responses');

const login = async ({ email, password }) => {
  const resultModel = await loginModels.login({ email, password });

  console.log(resultModel);
  if (!resultModel) return CODE_HTTP.UNAUTHORIZED;

  return resultModel;
};

module.exports = {
  login,
};