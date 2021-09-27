const Joi = require('joi');
const jwt = require('jsonwebtoken');
const LoginService = require('../services/LoginService');

const login = (req, res) => {
  const { email , password } = req.body;

  const { error } = Joi.object({
    
    email: Joi.string().required().not().empty(),
    password: Joi.string().required().not().empty(),
    
  }).validate(req.body);
  
  if (error) return res.status(401).json({
    message: 'All fields must be filled'
  })
  
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256'};

  const response = await LoginService.login({ email, password });
  if (response === 401) return res.status(401).json({
    message: 'Incorrect entry'
  })

  return res.status(200).json()
}