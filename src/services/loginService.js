const { loginModel } = require('../models');
const { code, verifyLogin } = require('../schema');
/**
 * 
 * @param { object } user email, password
 * @returns { promise }
 */
const getUser = async (user) => {
  const returnDataBase = await loginModel.getUser(user);

  const validation = verifyLogin.checkUser(user, returnDataBase);

  if (validation.notification) return validation;
  
  const { _id, email, role } = returnDataBase;

  const result = {
    status: code.HTTP_OK_STATUS,
    notification: { _id, email, role },
  };

  return result;
};

module.exports = {
  getUser,
};
