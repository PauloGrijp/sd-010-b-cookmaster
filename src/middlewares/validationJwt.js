const jwt = require('jsonwebtoken');
const UserModel = require('../models/loginModels');

const secret = 'secretdetoken';

const validationJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
     return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.findLogin({ 
      email: decoded.data.email, password: decoded.data.password, 
    });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validationJWT;
