const express = require('express');

const {
  verifyEmailSignUp,
  verifyNameSignUp,
  verifyPasswordSignUp,
} = require('../middlewares/usersMiddlewares');

const {
  createUser,
} = require('../service/usersService');

const httpStatus = require('./httpStatus');

const route = express.Router();

route.post('/',
  verifyEmailSignUp,
  verifyNameSignUp,
  verifyPasswordSignUp,
  async (req, res) => {
    const { name, email, password } = req.body;
    const user = {
      name,
      email,
      password,
      role: 'user',
    };
  const userCreated = await createUser(user);
  res.status(httpStatus.created).json({ user: userCreated });
});

module.exports = route;