const jwt = require('jsonwebtoken');
const modelUser = require('../../models/modelUsers');

const {
MISSING_TOKEN,
JWT_MALFORMED,
INVALID_ENTRIES,
} = require('../errosCode/errosMessage');

const secret = 'segredojwt';
const err = (statusCode) => ({ statusCode });

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (erro) {
    throw err(JWT_MALFORMED);
  }
};

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw err(MISSING_TOKEN);

  const payload = await verifyToken(token);

  const { _id } = await modelUser.getByEmail(payload.email);
  if (!_id) throw err(INVALID_ENTRIES);

  req.user = _id;
  next();
};
