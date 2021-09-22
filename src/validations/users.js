const Joi = require('joi');

const newUserBodyValidation = (name, email, password) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });
  
  if (error) throw error;
};

const alreadyExists = async (email, model) => {
  const user = await model.findUser(email);
  if (user) {
    const error = new Error('Email already registered');
    error.code = 409;
    throw error;
  }
};

const validateLoginBody = (email, password) => {
  if (!email || !password) {
    const error = new Error('All fields must be filled');
    error.code = 401;
    throw error;
  }
};

const checkUserLogin = (user) => {
  if (!user) {
    const error = new Error('Incorrect username or password');
    error.code = 401;
    throw error;
  }
};

module.exports = {
  newUserBodyValidation,
  alreadyExists,
  validateLoginBody,
  checkUserLogin,
};
