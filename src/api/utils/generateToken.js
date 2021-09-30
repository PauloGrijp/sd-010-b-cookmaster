const jwt = require('jsonwebtoken');

const secret = 'segredojwt';
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

module.exports = ({ _id, email, role }) => {
  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
  return token;
};
