const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const User = require('../services/serviceUsers');

const secret = 'tokensecreto';

const create = rescue(async (req, res, _next) => {
  const { name, email, password } = req.body;
  const { path } = req;
  const verifyEmail = await User.findEmail(email);
  // console.log(path);
  const role = (path.includes('user')) ? 'user' : 'admin';

  const createUser = await User.create(name, email, password, role);

  if (typeof createUser.message === 'string') return res.status(400).json(createUser);

  if (verifyEmail === false) return res.status(409).json({ message: 'Email already registered' });
  // console.log({ user: createUser });
  return res.status(201).json({
    user: {
      name,
      email,
      role,
      _id: createUser.id,
    },
  });
});

const login = rescue(async (req, res, _next) => {
  const { email, password } = req.body;

  const user = await User.login(email, password);
  // console.log(user);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  if (typeof user.message === 'string') return res.status(401).json(user);

  return res.status(200).json({ token });
});

module.exports = {
  create,
  login,
};