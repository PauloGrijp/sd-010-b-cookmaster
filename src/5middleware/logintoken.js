const jwt = require('jsonwebtoken');

const secret = 'seilah';

const jwtConfig = {
  expiresIn: '12h',
  algorithm: 'HS256',
};

const createToken = (data) => {
  const { name } = data;
  const token = jwt.sign({ data: name }, secret, jwtConfig);
  return { token };
};
// email, id, role

module.exports = {
  createToken,
};