const { createTokenUser } = require('../middlewares/tokenMiddlewares');
const { validCreateUser, checkEmailExist, checkLoginUser,
  validLoginUser, validCreateUserAdmin } = require('../middlewares/usersMiddlewares');
const { createUserM, checkEmailM } = require('../model/usersModel');

const createUserS = async (email, password, name, role) => {
  validCreateUser(email, password, name);
  await checkEmailExist(email);
  const { password: __, ...result } = await createUserM(email, password, name, role);
  return result;
};
const checkEmailS = async (email, password) => {
  validLoginUser(email, password);
  const user = await checkEmailM(email, password);
  checkLoginUser(user);
  const token = createTokenUser(user);
  return token;
};
const createUserAdminS = async (email, password, name, role) => {
  validCreateUserAdmin(role);
  const { password: _, ...result } = await createUserM(email, password, name, role);
  return result;
};

module.exports = {
  createUserS,
  checkEmailS,
  createUserAdminS,
};
