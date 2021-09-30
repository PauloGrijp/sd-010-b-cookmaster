const userModels = require('../models/userModels');
const { CODE_HTTP } = require('../helpers/responses');
const { validEmail } = require('../middlewares/validations');

const createUser = async ({ name, email, password }) => {
  const isValidEmail = validEmail(email);
  if (!isValidEmail) return CODE_HTTP.BAD_REQUEST; 
  
  const existingEmail = await userModels.findByEmail(email);
  if (existingEmail) { 
    return CODE_HTTP.CONFLICT;
  }
  // console.log('cheguei ');

  const resultModel = await userModels.createUser({ name, email, password });

  return resultModel;
};

const createAdmin = async ({ name, email, password, role }) => {
  if (role !== 'admin') return null;
  const resultModel = await userModels.createAdmin({ name, email, password, role });

  return resultModel;
};

module.exports = {
  createUser,
  createAdmin,
};