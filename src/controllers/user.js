const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const codes = require('../httpcodes');

const secret = 'myawesomesecret';

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const { user, error } = await userService.createUser(name, email, password);

  if (error) return res.status(error.code).json({ message: error.message });

  return res.status(codes.created).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { error, user } = await userService.login(email, password);
  if (error) return res.status(error.code).json({ message: error.message });

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  console.log(user);

  const token = jwt.sign({ user }, secret, jwtConfig);

  return res.status(codes.ok).json({ token });
};

const createAdminUser = async (req, res) => {
  const { role } = req.user;

  if (role !== 'admin') {
    return res.status(codes.forbidden).json({
      message: 'Only admins can register new admins',
    });
  }

  const { name, email, password } = req.body;

  const user = await userService.createAdminUser(name, email, password, role);

  return res.status(codes.created).json(user);
};

module.exports = {
  createUser,
  login,
  createAdminUser,
};
