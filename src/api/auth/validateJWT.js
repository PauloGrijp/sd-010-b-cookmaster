const jwt = require('jsonwebtoken');
const { findByEmail } = require('../../models/userModel');

const secret = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: 'token não encontrado' });

  try {
    const decoded = jwt.verify(token, secret);

    const user = await findByEmail({ email: decoded.data.email });

    if (!user) return res.status(401).json({ message: 'jwt malformed' });
    
    req.user = { user };

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};