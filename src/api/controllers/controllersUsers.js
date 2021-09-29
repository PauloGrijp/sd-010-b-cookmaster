const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const User = require('../services/serviceUsers');

const secret = 'tokensecreto';

const create = rescue(async (req, res, _next) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    const verifyEmail = await User.findEmail(email);
    const createUser = await User.create(name, email, password, role);

    if (typeof createUser.message === 'string') {
      return res.status(400).json(createUser);
    }

    if (verifyEmail === false) {
      return res.status(409).json({
        message: 'Email already registered',
      });
    }
    // console.log({ user: createUser });
    return res.status(201).json({ user: createUser });
  } catch (err) {
    console.error(err);
  }
});

const login = rescue(async (req, res, _next) => {
  const { email, password } = req.body;

  const user = await User.login(email, password);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  // console.log(user);

  if (typeof user.message === 'string') return res.status(401).json(user);

  return res.status(200).json({ token });
});

module.exports = {
  create,
  login,
};