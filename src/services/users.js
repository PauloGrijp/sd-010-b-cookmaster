const models = require('../models/users');

const { nameValidation, emailValidation, passwordValidation } = require('../validations/users');

const create = async (user) => {
  const { name, email, password } = user;
  const error = new Error();
  error.err = { code: 400, message: 'Invalid entries. Try again.' };

  const existsError = new Error();
  existsError.err = { code: 409, message: 'Email already registered' };

  const validName = nameValidation(name);
  const validemail = emailValidation(email);
  const validPassword = passwordValidation(password);

  if (validName === false || validemail === false || validPassword === false) throw error;

  const emailExists = await models.userExists(email);

  if (emailExists) throw existsError;

  const model = await models.create(user);
  delete model.password;
  return model;
};

module.exports = {
  create,
};
