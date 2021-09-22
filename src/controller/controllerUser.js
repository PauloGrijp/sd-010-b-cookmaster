const { createUser } = require('../service/serviceUser');
const catchAsync = require('../utils/catchAsync');

const creatSucess = 201;

  const createNewUser = catchAsync(async (req, res) => {
    const user = await createUser(req.body, res);
  res.status(creatSucess).json(user);
  });

module.exports = { createNewUser };