const { validateInput } = require('../middlewares/validateUser');
const { create } = require('../model/usersModel');
const { validateEmailExist } = require('./validationUser');

const createUser = async ({ name, email, password }, res) => {
  await validateInput(email, name, password, res);
  await validateEmailExist(email, res);
  const user = await create(name, email, password);
  return user;
};
module.exports = { createUser };
