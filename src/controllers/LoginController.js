const jwt = require('jsonwebtoken');

const LoginService = require('../services/LoginSrevice');

const secret = 'chave-secreta';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const loginValidate = await LoginService.login(email, password);

  if (loginValidate.message) {
    return res.status(401).json({ message: loginValidate.message });
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = await jwt.sign({ data: loginValidate }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  loginUser,
};