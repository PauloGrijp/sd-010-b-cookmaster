const { validCreateUser, checkEmailExist } = require('../middlewares/usersMiddlewares');
const usersModel = require('../model/usersModel');

const createUserS = async (email, password, name, role) => {
  validCreateUser(email, password, name);
  await checkEmailExist(email);
  const { password: __, ...result } = await usersModel.createUserM(email, password, name, role);
  return result;
};

module.exports = {
  createUserS,
};
