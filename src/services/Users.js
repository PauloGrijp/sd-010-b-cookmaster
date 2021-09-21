const Users = require('../models/Users');
const Error = require('../utils/createObjError');

const create = async (name, email, password, role) => {
  const checkProduct = await Users.findByEmail(email);
  if (checkProduct) return Error.conflict('Email already registered');
  return Users.create(name, email, password, role);
};

module.exports = {
  create,
};
