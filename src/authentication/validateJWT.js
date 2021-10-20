const jwt = require('jsonwebtoken');

const secret = 'secrettoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decode = jwt.verify(token, secret);
    const user = decode.data;

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
