const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const SECRET = 'superSenha';
    
    const payload = jwt.verify(token, SECRET);
    
    const { _id } = payload.data;

    req.payloadId = _id;
  
    return next();
  } catch (_err) {
    return next({ status: 401, message: 'jwt malformed' });
  }
};
