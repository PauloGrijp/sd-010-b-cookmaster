const jwt = require('jsonwebtoken');
const usersModels = require('../models/usersModels');

const secret = 'OMG';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersModels.findByEmail(decoded.email);
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
