const express = require('express');

const userRouter = express.Router();
const { createUser } = require('../controller/users');

userRouter.route('/')
  .post(createUser);

module.exports = userRouter;