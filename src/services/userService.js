const { userModel } = require('../models');
const {
  HTTP_CREATED,
} = require('../schema/codeHttp');
const { checkName } = require('../schema/userSchema');

const createUser = async (body) => {
  const existingName = await userModel.getByName(body);
  const validation = await checkName(existingName);

  if (validation.notification) return validation;
  
  const register = { ...body, role: 'user' };
  const { name, email, role, _id } = await userModel.createUser(register);
  
  const newUser = {
    status: HTTP_CREATED,
    notification: { user: { name, email, role, _id } },
  };

  return newUser;
};

module.exports = {
  createUser,
};
