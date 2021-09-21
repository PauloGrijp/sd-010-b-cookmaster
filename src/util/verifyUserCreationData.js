module.exports = (name, email, password) => {
  if (!name || !email || !password) return false;
  return true;
};
