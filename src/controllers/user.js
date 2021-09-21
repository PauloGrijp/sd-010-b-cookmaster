const codes = require('../../httpcodes');
const userModel = require('../models/user');

const userWithoutPassword = require('../util/userWithoutPassword');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.createUser(name, email, password);

  return res.status(codes.created).json({ user: userWithoutPassword(user) });
};

module.exports = {
  createUser,
};
