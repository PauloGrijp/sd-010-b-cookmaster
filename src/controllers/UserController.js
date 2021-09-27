const Joi = require('joi');
const UserService = require('../services/UserService');

const BAD_REQUEST = 400;
const CONFLICT = 409;
const INVALID_ENTRIES = { message: 'Invalid entries. Try again.' };
const EMAIL_ALREADY_REGISTERED = { message: 'Email already registered' };


const createUser = async (req, res) => {
  
  const { error } = Joi.object({
    
    name: Joi.string().required().not().empty(),
    email: Joi.string().required().not().empty(),
    password: Joi.string().required().not().empty(),
    
  }).validate(req.body);
  
  if (error) return res.status(BAD_REQUEST).json(INVALID_ENTRIES)
  
  const { name, email , password } = req.body;
  const response = await UserService.createUser({ name, email, password });

  if (response === 400) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);

  if (response === 409) return res.status(CONFLICT).json(EMAIL_ALREADY_REGISTERED);

  return res.status(201).json(response);
}

module.exports = {
  createUser,
};
