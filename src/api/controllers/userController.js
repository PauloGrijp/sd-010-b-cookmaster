const { createUser, createAdminUser } = require('../service/userService');
const catchAsync = require('../utils/catchAsync');

const create = catchAsync(async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
});

module.exports = {
  create,

};
