const Joi = require('joi');
const { getUserByEmail } = require('../models/usersModel');

const validEntries = (name, email, password) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate({ name, email, password });
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
};