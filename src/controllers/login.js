const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = 'secretToken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findEmail(email);
    const token = jwt.sign({ data: user }, secret, jwtConfig);
  return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};
