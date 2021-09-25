const { StatusCodes } = require('http-status-codes');
const userService = require('../services/userService');

const create = async (req, res) => {
  const result = await userService.create(req.body);
  if (result.message) { return res.status(result.code).json({ message: result.message }); }
  return res.status(StatusCodes.CREATED).json({ user: result });
}; 

module.exports = {
  create,
};