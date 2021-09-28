const { loginService } = require('../services');
const { code, error } = require('../schema');

const getUser = async (req, res) => {
  try {
    const user = req.body;

    const { status, notification } = await loginService.getUser(user);

    return res.status(status).json(notification);
  } catch (e) {
    return res.status(code.HTTP_INTERNAL_SERVER_ERROR).json({ message: error.unexpectedError });
  }
};

module.exports = {
  getUser,
};
