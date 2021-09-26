const validates = require('../middlewares/validateLogin');

const checkLogin = async (email, password) => {
  const emptyInputs = validates.checkEmptyInputs(email, password);
  if (emptyInputs.message) return { message: emptyInputs.message };

  const user = await validates.verifyPassword(email, password);
  if (user.message) return { message: user.message };

  return user;
};

module.exports = {
  checkLogin,
};