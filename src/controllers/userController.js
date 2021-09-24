const express = require('express');
const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');
const userServices = require('../services/userServices');

const usersRouter = express.Router();

usersRouter.post('/', rescue(async (req, res) => {
  const user = await userServices.createUser(req.body);
  if (user.isError) {
    return res.status(user.code).json({ message: user.message });
  }
  return res.status(StatusCodes.CREATED).json({ user });
}));

module.exports = usersRouter;