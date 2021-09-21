const jwt = require('jsonwebtoken');
const { findUser } = require('../models/userModel');

const segredo = 'secreto';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'token não existe' });
  }
  
  try {
    const decoded = jwt.verify(token, segredo);
    const user = await findUser(decoded.email);
    if (!user) {
      return res.status(401).json(
        { message: 'Erro ao procurar usuario do token.' },
      );
    }
    req.user = user;
    next();
  } catch (_err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateJWT };
