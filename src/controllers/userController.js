const service = require('../services/userService');

const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await service.createNewUser(name, email, password);
  if (result.err) {
    return res.status(result.status).json(result.err);
  }
  res.status(201).json(result);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await service.login(email, password);
  if (result.err) {
    return res.status(result.status).json(result.err);
  }
  res.status(200).json(result);
};

module.exports = {
  createNewUser,
  login,
};