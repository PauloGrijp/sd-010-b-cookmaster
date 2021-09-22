const userservices = require('../services/usersServices.');

const addUser = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const result = await userservices.addUser(name, email, password);
  console.log(result);
  return res.status(201).json(result);
};

const userByAll = async (_req, res, _next) => {
  const result = await userservices.userByAll();
  return res.status(200).json(result);
};

module.exports = {
  addUser,
  userByAll,
};