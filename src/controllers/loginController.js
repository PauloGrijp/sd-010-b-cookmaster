const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secret = 'senha-super';

const jwtConfiguration = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

function validateFields(req, res, next) {
  const { password, email } = req.body;

  if (!loginService.validateFields(password, email)) {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }

  next();
}

function validateEmail(req, res, next) {
  const { email } = req.body;

  if (!loginService.validateEmail(email)) {
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }

 next();
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await loginService.validatePassword(email, password);
  
  if (!user) {
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }
  const { _id: id, role } = user;
  const payload = {
    id,
    email: user.email,
    role,
  };

  const token = jwt.sign({ data: payload }, secret, jwtConfiguration);
  return res.status(200).json({ token });
}

module.exports = {
  validateFields,
  validateEmail,
  login,
};