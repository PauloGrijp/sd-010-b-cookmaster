const jwt = require('jsonwebtoken');

const secret = 'seilah';

const jwtConfig = {
  expiresIn: '12h',
  algorithm: 'HS256',
};

const createToken = (dados) => {
  const data = dados;
  delete data.password;
  const token = jwt.sign({ data }, secret, jwtConfig);
  return { token };
};

const verifyToken = async (token) => {
  try {
    const verify = jwt.verify(token, secret);
    return verify.data;
  } catch (error) {
    return 'error';
  }
};

module.exports = {
  createToken,
  verifyToken,
};