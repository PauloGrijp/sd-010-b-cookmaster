const Joi = require('joi');
const jwt = require('jsonwebtoken');
const loginServices = require('../services/loginServices');
const { CODE_HTTP, MESSAGE } = require('../helpers/responses');

const secret = 'segredoLotar';

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = Joi.object({
      email: Joi.string().required().not().empty(),
      password: Joi.string().required().not().empty(),
  }).validate(req.body);
  
  if (error) return res.status(CODE_HTTP.UNAUTHORIZED).json(MESSAGE.NO_ENTRY_FIELD);

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  
  const resultController = await loginServices.login({ email, password });
  
  if (resultController === 401) {
    return res.status(CODE_HTTP.UNAUTHORIZED).json(MESSAGE.INCORRECT_ENTRY);
  }

  const token = jwt.sign({ data: resultController }, secret, jwtConfig);
  return res.status(CODE_HTTP.SUCCESS).json({ token });
};

module.exports = {
  login,
};