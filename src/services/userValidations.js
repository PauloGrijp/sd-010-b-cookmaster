const userModels = require('../models/userModels');

const validateName = (name) => {
  if (!name) {
    return false;
  }
  return true;
};

const createUserValidations = async ({ name, email, password, role }) => {
  const validName = validateName(name);
  if (!validName) {
    return { message: ' Invalid entries. Try again.' };
  }
  const create = await userModels.creatUser({ name, email, password, role });
  return create;
};

module.exports = {
  createUserValidations,
};