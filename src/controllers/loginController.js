const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secret = 'secrettoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

async function userLogin(req, res) {
  const { email, password } = req.body;
  const loginData = await loginService.login(email, password);

  if (loginData === 'error_required_field') {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  
  if (loginData === 'error_invalid_field') {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const token = jwt.sign({ data: { email, password } }, secret, jwtConfig);

  return res.status(200).json({ token });
}

module.exports = {
  userLogin,
};
