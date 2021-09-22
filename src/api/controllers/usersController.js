const userservices = require('../services/usersServices.');

const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const result = await userservices.addUser(name, email, password);
  console.log(result);
  return res.status(200).json(result);
};

module.exports = {
  addUser,
};