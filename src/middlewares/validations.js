const { ObjectId } = require('mongodb');

const validateEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

  if (!regex.test(email)) return false;
  return true;
};

const validateId = (id) => {
  if (!ObjectId.isValid(id)) return false;
  return true;
};

module.exports = {
  validateEmail,
  validateId,
};