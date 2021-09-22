const jwt = require('jsonwebtoken');
const { loginService } = require('../services');
const { code, error } = require('../schema');

const secret = 'cookmasterprojecttoken';
const jwtConfig = {
  expiresIn: '4h',
  algorithm: 'HS256',
};

const getUser = async (req, res) => {
  try {
    const user = req.body;

    const { status, notification } = await loginService.getUser(user);

    if (notification.message) {
      return res.status(status).json(notification);
    }

    const jwtToken = jwt.sign({ data: notification }, secret, jwtConfig);

    return res.status(status).json({ token: jwtToken });
  } catch (e) {
    return res.status(code.HTTP_INTERNAL_SERVER_ERROR).json({ message: error.unexpectedError });
  }
};

module.exports = {
  getUser,
};
