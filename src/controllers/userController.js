const { userService } = require('../services');
const { code, error } = require('../schema');

const createUser = async (req, res) => {
  try {
    const user = req.body;

    const { status, notification } = await userService.createUser(user);

    return res.status(status).json(notification);
  } catch (e) {
    return res.status(code.HTTP_INTERNAL_SERVER_ERROR).json({ message: error.unexpectedError });
  }
};

module.exports = {
  createUser,
};
