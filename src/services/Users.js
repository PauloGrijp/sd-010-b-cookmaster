const Utils = require('../utils');
const Model = require('../models');

const invalidEntries = 'Invalid entries. Try again.';
const emailRegistered = 'Email already registered';

const createUser = async (name, email, password) => {
  // console.log('SERVICE createUser req.body', name, email, password);

  const { error } = Utils.validateCredentialsData({ name, email, password });
  if (error) throw Error(invalidEntries);

  const userAlreadyExist = await Model.findUser(email);
  if (userAlreadyExist) throw Error(emailRegistered);

  return Model.createUser(name, email, password);
};
  
module.exports = {
  createUser,
};
