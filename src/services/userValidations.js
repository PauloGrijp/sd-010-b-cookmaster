const userModels = require('../models/userModels');

// Valildações do usuário
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
  const validFormatEmail = await userModels.findByEmail(email);
  if (!validName || !validEmail) {
    return { message: 'Invalid entries. Try again.' };
  }
  if (validFormatEmail) {
    return { message: 'Email already registered' };
  }
  const create = await userModels.creatUser({ name, email, password, role });
  return create;
};

module.exports = {
  createUserValidations,
};