const { checkEmptyInputs, verifyPassword } = require('../validations/Login');

const checkLogin = async (email, password) => {
  const emptyInputs = checkEmptyInputs(email, password);
  if (emptyInputs.message) return { message: emptyInputs.message };

  const user = await verifyPassword(email, password);
  if (user.message) return { message: user.message };

  return user;
};

module.exports = {
  checkLogin,
};
