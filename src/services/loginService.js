const model = require('../models/login');
const { code, verifyLogin } = require('../schema');
/**
 * 
 * @param { object } user email, password
 * @returns { promise }
 */
const getUser = async (user) => {
  const returnDataBase = await model.getUser(user);

  const validation = await verifyLogin.checkUser(user, returnDataBase);

  if (validation.notification) return validation;

  const result = {
    status: code.HTTP_OK_STATUS,
    notification: {},
  };

  return result;
};

module.exports = {
  getUser,
};
