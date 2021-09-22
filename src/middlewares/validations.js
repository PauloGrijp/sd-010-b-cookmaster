const validName = (email) => {
  const REGEX_EMAIL = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

  if (!REGEX_EMAIL.test(email)) return false;
  return true;
};

module.exports = {
  validName,
};