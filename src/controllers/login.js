const jwt = require('jsonwebtoken');
const services = require('../services/login');

const SECRET = 'super-senha';
const jwtConfiguration = { expiresIn: '15min', algorithm: 'HS256' };

const login = async (req, res) => {
  try {
    const user = req.body;

    const userExists = await services.login(user);
    const { _id } = userExists;

    const userWithoutPass = {
      _id,
      name: userExists.name,
      email: userExists.email,
      role: userExists.role,
    };

    const token = jwt.sign({ data: userWithoutPass }, SECRET, jwtConfiguration);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(error.err.code).json({ message: error.err.message });
  }
};

module.exports = {
  login,
};
