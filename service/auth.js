const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const missingToken = { status: 401, message: 'missing auth token' };
const notFound = { status: 404, message: 'User Not Found' };
const jwtError = { status: 401, message: 'jwt malformed' };

const validadeLogin = async (req, _res, next) => {
  try {
    const secret = '1234';
    const { authorization } = req.headers;
    if (!authorization) { throw missingToken; }
    const extractToken = jwt.verify(authorization, secret);    
    const userDb = await userModel.findEmail(extractToken.email);
    if (!userDb) { throw notFound; }
    req.user = userDb;
    next();
  } catch (e) {
    if (!e.status) {
      e.status = jwtError.status;
      e.message = jwtError.message;
    }
    next(e);
  }
};

const secret = '1234';
const generateToken = (email, id, role) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  try {
    const token = jwt.sign({ email, id, role }, secret, jwtConfig);
    return token;
  } catch (e) {
    const error = {
      status: 400,
      message: 'Sign function  is tired. try later',
    };
    throw error;
  }
};

module.exports = {
  validadeLogin,
  generateToken,
};
