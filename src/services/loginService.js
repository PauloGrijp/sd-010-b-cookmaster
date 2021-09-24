const { getPassword, createLogin, getUserByEmail } = require('../models/loginModel');
const { errorBusiness } = require('../middlewares/errors');

const createServiceLogin = async (email, password) => {
  const emailIsValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
  if (!emailIsValid.test(email)) {
    return errorBusiness('Incorrect username or password');
  }

  const passIsValid = await getPassword(password);

  if (!passIsValid) {
    return errorBusiness('Incorrect username or password');
  }

  const login = await createLogin(email, password);
  return login;
};

module.exports = {
  createServiceLogin,
  getUserByEmail,
};