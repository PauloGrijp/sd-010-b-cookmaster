const nameValidation = (name) => {
  if (!name) return false;

  return true;
};

const emailValidation = (email) => {
  if (!email) return false;

  const emailRegex = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/i;

  const verify = emailRegex.test(email);

  return verify;
};

const passwordValidation = (password) => {
  if (!password) return false;

  return true;
};

module.exports = {
  nameValidation,
  emailValidation,
  passwordValidation,
};
