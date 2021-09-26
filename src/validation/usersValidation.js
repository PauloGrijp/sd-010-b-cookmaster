const validateEmail = (email) => {
  const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);

  if (emailRegex.test(email)) return true;

  return false;
};

const validateName = (name) => {
  if (name && name.length > 3) return true;

  return false;
};

const validatePassword = (password) => {
  if (password && password.length > 5) return true;

  return false;
};

module.exports = {
  validateEmail,
  validateName,
  validatePassword,
};