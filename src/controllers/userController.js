const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');
// const middlewares = require('../middlewares/userMiddlewares')
const userServices = require('../services/userServices');

const createUser = rescue(async (req, res) => {
  const user = await userServices.createUser(req.body);
  res.status(StatusCodes.CREATED).json({ user });
});

module.exports = {
  createUser,
};