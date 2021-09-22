require('dotenv').config();
const jwt = require('jsonwebtoken');
const { StatusCodes: { UNAUTHORIZED, OK, INTERNAL_SERVER_ERROR } } = require('http-status-codes');

const Login = require('../services/Login');

const secret = process.env.SECRET || 'notSoSecret';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const checkLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await Login.checkLogin(email, password);
    if (result.message) return res.status(UNAUTHORIZED).json(result);

    const { _id, role } = result;
    const payload = { _id, email, role };
    const token = jwt.sign(payload, secret, jwtConfig);

    return res.status(OK).json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(INTERNAL_SERVER_ERROR).send('Something went wrong');
  }
};

module.exports = {
  checkLogin,
};
