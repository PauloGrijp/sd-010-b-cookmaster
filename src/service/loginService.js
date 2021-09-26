const { errorLogin } = require('../middleware/estructError');
const getByPassword = require('../model/loginModel');

const createLogin = async (login) => {
  const { email, password } = login;
  const emailIsValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
  const validPassword = await getByPassword(password);
  if (!emailIsValid.test(email) || !validPassword) {
    return errorLogin('Incorrect username or password');
  }
  return validPassword;
};

module.exports = createLogin;