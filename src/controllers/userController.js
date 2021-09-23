const Joi = require('joi');
const userServices = require('../services/userServices');
const { CODE_HTTP, MESSAGE } = require('../helpers/responses');

const createUser = async (req, res) => {
  const { error } = Joi.object({
    name: Joi.string().required().not().empty(),
    email: Joi.string().required().not().empty(),
    password: Joi.string().required().not().empty(),
  }).validate(req.body);
  if (error) return res.status(CODE_HTTP.BAD_REQUEST).json(MESSAGE.INVALID_ENTRIES); 

  const { name, email, password } = req.body;
  const resultServices = await userServices.createUser({ name, email, password });
  
  if (resultServices === 400) { 
    return res.status(CODE_HTTP.BAD_REQUEST).json(MESSAGE.INVALID_ENTRIES); 
  }
  
  if (resultServices === 409) { 
    return res.status(CODE_HTTP.CONFLICT).json(MESSAGE.EMAIL_ALREADY_EXISTS); 
  }

  return res.status(CODE_HTTP.CREATE_SUCCESS).json(resultServices);
};

module.exports = {
  createUser,
};