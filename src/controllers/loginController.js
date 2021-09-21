const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secret = 'super-senha';
const jwtConfiguration = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const verifyEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;
  const validEmailAndPassword = loginService.verifyEmailandPassword(email, password);
  if (!validEmailAndPassword) { 
    return res.status(401).json({ message: 'All fields must be filled' }); 
}
next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validEmail = loginService.validateEmail(email);
  if (!validEmail) { return res.status(401).json({ message: 'Incorrect username or password' }); }
  next();
};

const userLogin = async (req, res) => {
const { email, password } = req.body;
const user = await loginService.findUser({ email, password });
if (!user) { return res.status(401).json({ message: 'Incorrect username or password' }); }
delete user.password;
const token = jwt.sign({ data: user }, secret, jwtConfiguration);
return res.status(200).json(token);
};

module.exports = {
  userLogin,
  verifyEmailAndPassword,
  validateEmail,
};