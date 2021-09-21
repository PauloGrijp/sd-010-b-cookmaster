const userModels = require('../models/userModels');

const validateName = (name) => {
  if (!name) {
    return false;
  }
  return true;
};

const validateEmail = (email) => {
  const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  if (!email || !regexEmail.test(email)) {
    return false;
  }
  return true;
};

const createUserValidations = async ({ name, email, password, role }) => {
  const validName = validateName(name);
  const validEmail = validateEmail(email);
  if (!validName) {
    return { message: 'Invalid entries. Try again.' };
  }
  if (!validEmail) {
    return { message: 'Invalid entries. Try again.' };
  }
  const create = await userModels.creatUser({ name, email, password, role });
  return create;
};

module.exports = {
  createUserValidations,
};