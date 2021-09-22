const Joi = require('joi');
const userServices = require('../services/userServices');
const { CODE_HTTP, MESSAGE } = require('../helpers/responses');

const createUser = async (req, res) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(req.body);
  if (error) return res.status(CODE_HTTP.BAD_REQUEST).json(MESSAGE.ENTRIES_INVALID); 

  const { name, email, password } = req.body;
  const resultServices = await userServices.createUser({ name, email, password });

  if (resultServices === 400) { 
    return res.status(CODE_HTTP.BAD_REQUEST).json(MESSAGE.ENTRIES_INVALID); 
  }

  if (resultServices === 409) { 
    return res.status(CODE_HTTP.CONFLICT).json(MESSAGE.EMAIL_ALREADY_EXISTS); 
  }

  // console.log(resultServices);
  return res.status(CODE_HTTP.CREATE_SUCCESS).json(resultServices);
};

module.exports = {
  createUser,
};