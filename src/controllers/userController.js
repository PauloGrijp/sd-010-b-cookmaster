const express = require('express');
const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  const newUser = req.body;
  const result = await userService.createUser(newUser);

  if (result.message) {
    if (result.message.includes('Email')) return res.status(StatusCodes.CONFLICT).json(result);
    return res.status(StatusCodes.BAD_REQUEST).json(result);
  }

  return res.status(StatusCodes.CREATED).json(result);
});

module.exports = userRouter;
