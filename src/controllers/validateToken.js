const jwt = require('jsonwebtoken');
const status = require('http-status');

const secretKey = 'senha-secreta';

const validate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, secretKey); // payload
    req.user = { id: decoded.data.id };

    next();
  } catch (err) {
    return res.status(status.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = { validate };