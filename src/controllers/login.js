const jwt = require('jsonwebtoken');
const services = require('../services/login');

const SECRET = 'super-senha';
const jwtConfiguration = { expiresIn: '15min', algorithm: 'HS256' };

const login = async (req, res) => {
  try {
    const user = req.body;

    await services.login(user);

    const userWithoutPass = {
      // id: user._id,
      username: user.username,
    };

    const token = jwt.sign({ data: userWithoutPass }, SECRET, jwtConfiguration);

    return res.status(200).json(token);
  } catch (error) {
    return res.status(error.err.status).json({ message: error.err.message });
  }
};

module.exports = {
  login,
};
