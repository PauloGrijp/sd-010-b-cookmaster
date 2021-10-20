const jwt = require('jsonwebtoken');
const Service = require('../services/LoginServices');

async function login(req, res) {
  const { email, password } = req.body;
  const user = await Service.login(email, password);

  if (user.err) return res.status(user.err.status).json(user.err.message);

  const secret = 'MySecret';
  
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