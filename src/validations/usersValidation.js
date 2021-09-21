const Joi = require('joi');
const { getUserByEmail } = require('../models/usersModel');

const validEntries = (name, email, password) => {
  const entries = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = entries.validate({ name, email, password });
  if (error) return false;
  return true;
};

const validLogin = (name, password) => {
  const login = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = login.validate({ name, password });
  if (error) return false;
  return true;
};

const emailExists = async (email) => {
  if (await getUserByEmail(email)) return true;
  return false;
};

module.exports = {
  validEntries,
  emailExists,
  validLogin,
};