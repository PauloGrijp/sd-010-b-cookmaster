const { createTokenUser } = require('../middlewares/auth');
const { validCreateUser, checkEmailExist, checkLoginUser,
  validLoginUser } = require('../middlewares/usersMiddlewares');
const usersModel = require('../model/usersModel');

const createUserS = async (email, password, name, role) => {
  validCreateUser(email, password, name);
  await checkEmailExist(email);
  const { password: __, ...result } = await usersModel.createUserM(email, password, name, role);
  return result;
};
const login = async (email, password) => {
  validLoginUser(email, password);
  const user = await usersModel.checkEmailM(email, password);
  checkLoginUser(user);
  const token = createTokenUser(user);
  return token;
};

module.exports = {
  createUserS,
  login,
};
