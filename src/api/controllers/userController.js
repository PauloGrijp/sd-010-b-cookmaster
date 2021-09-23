const userServices = require('../services/userService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await userServices.createUser(name, email, password);
  return res.status(200).json(result);
};

module.exports = {
    createUser,
};
