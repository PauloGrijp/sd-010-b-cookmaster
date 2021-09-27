const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secret = 'seusecretdetoken';

const jwtConfiguration = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginService.login(email, password);
    if (user.message) return res.status(401).json(user);

    const { _id, role } = user;
    const userWithoutPassword = {
      _id,
      email,
      role,
    };

    const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfiguration);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login };