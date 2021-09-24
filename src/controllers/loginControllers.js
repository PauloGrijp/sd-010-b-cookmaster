const jwt = require('jsonwebtoken');
const loginValidations = require('../services/loginValidations');

const secret = 'secretdetoken';

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { message } = await loginValidations.findLogin({ email, password });
  if (message) {
    return res.status(401).json({ message });
  }
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const login = await loginValidations.findLogin({ email, password });
  const token = jwt.sign({ data: login }, secret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = {
  loginUser,
};