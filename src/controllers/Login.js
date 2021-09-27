const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = 'seusecretdetoken';

const userValidate = (user, password) => {
  if (!user || user.password !== password) {
    return false; 
  }
  return true;
};

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });

    const user = await User.findByMail(email);

    if (!userValidate(user, password)) {
      return res.status(401).json({ message: 'Incorrect username or password' }); 
    }

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Internal error', error: e });
  }
};