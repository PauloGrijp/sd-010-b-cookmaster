const jwt = require('jsonwebtoken');
const LoginService = require('../services/LoginService');

const secret = 'chave-secreta';

const loginUser = async (req, res) => {
  const { email, password } = req.body;  
  
  const loginValidate = await LoginService.login(password, email);

  if (loginValidate.message) {
    return res.status(401).json({ message: loginValidate.message });
  }
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  delete loginValidate.password; 

  const token = jwt.sign({ data: loginValidate }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  loginUser,
};