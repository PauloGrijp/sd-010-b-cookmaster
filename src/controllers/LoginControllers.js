const jwt = require('jsonwebtoken');
const Service = require('../services');

const secret = 'MySecret';

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Service.login.login(email, password);

  
  if (user.err) {
    return res.status(user.err.status).json(user.err.message);
  }

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, secret, jwtConfig);

  return res.status(200).json({ token });
}

module.exports = {
  login,
};