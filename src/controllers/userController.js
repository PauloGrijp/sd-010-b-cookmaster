const service = require('../services/userService');
const { HTTP_INTERNAL_SERVER_ERROR } = require('../schema/codeHttp');

const UNEXPECTED_ERROR = 'unexpected error';

const createUser = async (req, res) => {
  try {
    const user = req.body;

    const { status, notification } = await service.createUser(user);

    return res.status(status).json(notification);
  } catch (e) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

module.exports = {
  createUser,
};
