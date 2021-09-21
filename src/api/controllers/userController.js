const { createUser, createAdminUser } = require('../service/userService');
const catchAsync = require('../utils/catchAsync');

const create = catchAsync(async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
});

const createAdmin = catchAsync(async (req, res) => {
  const { role } = req.user;
  const newAdmin = await createAdminUser(req.body, role);
  return res.status(201).json(newAdmin);
});

module.exports = {
  create,
  createAdmin,

};
