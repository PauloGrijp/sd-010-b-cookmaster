const { ObjectId } = require('mongodb');

const validEmail = (email) => {
  const REGEX_EMAIL = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

  if (!REGEX_EMAIL.test(email)) return false;
  return true;
};

const isValidID = (id) => {
  if (!ObjectId.isValid(id)) return false; 
  return true;
};

module.exports = {
  validEmail,
  isValidID,
};