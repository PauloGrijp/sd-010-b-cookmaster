const express = require('express');
const rescue = require('express-rescue');
const { usersValidate } = require('../middlewares');
const Users = require('../services/Users');
const { CREATE } = require('../utils/statusCode');

const users = express.Router();

users.use(usersValidate);

users.post(
  '/',
  rescue(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await Users.create(name, email, password, role);
    if (user.isError) return next(user);
    return res.status(CREATE).json({ user });
  }),
);

module.exports = users;
