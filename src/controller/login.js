require('dotenv').config();
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const servicesLogin = require('../services/login');

const secret = process.env.SECRET || 'notSoSecret';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const checkLogin = rescue(async (req, res) => {
  const { email, password } = req.body;

    const result = await servicesLogin.checkLogin(email, password);
    if (result.message) return res.status(StatusCodes.UNAUTHORIZED).json(result);

    const { _id, role } = result;
    const payload = { _id, email, role };
    const token = jwt.sign(payload, secret, jwtConfig);

    return res.status(StatusCodes.OK).json({ token });
});

module.exports = {
  checkLogin,
};
