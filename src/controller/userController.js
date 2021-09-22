const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');

const create = async (req, res) => {
  const result = await userService.create(req.body);
  return res.status(StatusCodes.CREATED).json(result);
}; 

module.exports = {
  create,
};