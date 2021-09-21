const Joi = require('joi');
const userServices = require('../services/userServices');
const { CODE, MESSAGE } = require('../helpers/responses');

const createUser = async (req, res) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(req.body);

  if (error) res.status(CODE.BAD_REQUEST).json(MESSAGE.ENTRIES_INVALID);

  const { name, email, password } = req.body;

 const resultServece = await userServices.createUser();
};

module.exports = {
  createUser,
};