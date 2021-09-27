const jwt = require('jsonwebtoken');
const model = require('../../models/User');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, segredo);
    const user = await model.findByMail(decoded.data.email);
    if (!user) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};