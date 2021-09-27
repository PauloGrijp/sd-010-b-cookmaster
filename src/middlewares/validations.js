const validateEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

  if (!regex.test(email)) return false;
  return true;
};

module.exports = {
  validateEmail,
};