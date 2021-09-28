const { StatusCodes } = require('http-status-codes');
const JWT = require('jsonwebtoken');

const segredo = 'super-senha-que-ninguem-sabe';
const validToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  try {
    const decoded = JWT.verify(token, segredo);
    const { data } = decoded;
    req.user = data;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validToken,
};