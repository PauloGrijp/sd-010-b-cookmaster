const Joi = require('joi');
const jwt = require('jsonwebtoken');
const LoginService = require('../services/LoginService');

const UNAUTHORIZED = 401;
const OK_200 = 200;

const secret = 'superSecret123';

const login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = Joi.object({
    email: Joi.string().required().not().empty(),
    password: Joi.string().required().not().empty(),
  }).validate(req.body);
  
  if (error) {
 return res.status(401).json({ message: 'All fields must be filled' }); 
}
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  const response = await LoginService.login({ email, password });
  if (response === 401) {
 return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' }); 
}

  const token = jwt.sign({ data: response }, secret, jwtConfig);
  return res.status(OK_200).json({ token });
};

module.exports = {
  login,
};