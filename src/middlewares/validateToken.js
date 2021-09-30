const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ status: 401, message: 'missing auth token' });
  try {
    const SECRET = 'superSenha';
    
    const payload = jwt.verify(token, SECRET);
    
    const { _id, role } = payload.data;

    req.payload = { _id, role };
  
    next();
  } catch (_err) {
    return next({ status: 401, message: 'jwt malformed' });
  }
};
