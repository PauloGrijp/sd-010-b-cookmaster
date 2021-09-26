const rescue = require('express-rescue');
const User = require('../services/serviceUsers');
const UserModel = require('../models/modelUsers');

const create = rescue(async (req, res, _next) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    const verifyEmail = await UserModel.findEmail(email);
    const createUser = await User.create(name, email, password, role);
    // console.log(createUser);
    if (typeof createUser.message === 'string') {
      return res.status(400).json(createUser);
    }

    if (verifyEmail) {
      return res.status(409).json({
        message: 'Email already registered',
      });
    }

    return res.status(201).json(createUser);
  } catch (err) {
    console.error(err);
  }
});

module.exports = {
  create,
};