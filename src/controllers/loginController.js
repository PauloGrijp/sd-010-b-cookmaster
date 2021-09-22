const jwt = require('jsonwebtoken');
const service = require('../services/loginService');
const { code } = require('../schema');

const UNEXPECTED_ERROR = 'unexpected error';
const secret = 'cookmasterprojecttoken';
const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const getUser = async (req, res) => {
  try {
    const user = req.body;

    const { status, notification } = await service.getUser(user);

    if (notification.message) {
      return res.status(status).json(notification);
    }

    const jwtToken = jwt.sign(notification, secret, jwtConfig);

    return res.status(status).json({ token: jwtToken });
  } catch (e) {
    return res.status(code.HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

module.exports = {
  getUser,
};
