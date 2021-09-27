const usersModel = require('../models/usersModel');
const usersValidation = require('../validation/usersValidation');

const validationObjError = {
  error: {
    status: 400,
    message: 'Invalid entries. Try again.',
  },
};

const uniqueEmailObjError = {
  error: {
    status: 409,
    message: 'Email already registered',
  },
};

const createUser = async (userData) => {
  const newUser = userData;
  const { email, name, password } = newUser;
  const emailValid = usersValidation.validateEmail(email);
  const nameValid = usersValidation.validateName(name);
  const passwordValid = usersValidation.validatePassword(password);
  
  if (!emailValid || !nameValid || !passwordValid) return validationObjError;
  
  const foundUser = await usersModel.getUser(email);

  if (foundUser) return uniqueEmailObjError;

  newUser.role = 'user';

  const { insertedId } = await usersModel.createUser(newUser);

  return { user: { email, name, role: newUser.role, _id: insertedId } };
};

module.exports = {
  createUser,
};