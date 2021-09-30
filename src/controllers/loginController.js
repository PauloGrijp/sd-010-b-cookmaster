const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secret = 'vida-loca';

async function login(req, res) {
  const { email, password } = req.body;
  const loginData = await loginService.login(email, password);
  console.log(loginData);
  
  if (loginData.err) {
    return res.status(loginData.err.status).json(loginData.err.message);
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, secret, jwtConfig);

  return res.status(200).json({ token });
}

module.exports = {
  login,
};
