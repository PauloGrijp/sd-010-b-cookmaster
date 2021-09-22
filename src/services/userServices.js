const userModels = require('../models/userModels');
const { CODE_HTTP } = require('../helpers/responses');
const { validName } = require('../middlewares/validations');

const createUser = async ({ name, email, password }) => {
  const isValidName = validName(email);
  if (!isValidName) return CODE_HTTP.BAD_REQUEST; 

  const user = await userModels.findByEmail(email);
  console.log(user);

  const resultModel = await userModels.createUser({ name, email, password });

  return resultModel;
};

module.exports = {
  createUser,
};