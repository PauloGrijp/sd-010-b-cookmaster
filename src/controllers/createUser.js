const services = require('../services');

const createUser = async (req, res, next) => {
  const user = req.body;
  const newUser = await services.createUser(user);
  if (newUser.message) {
  return next(newUser);
  }
  res.status(201).json(newUser);
};

module.exports = createUser;