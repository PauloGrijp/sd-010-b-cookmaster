const jwt = require('jsonwebtoken');
const service = require('../services/serviceUsers');

const secret = 'tokensecreto';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await service.login(decoded.data.email);

    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar email' });
    }

    res.user = user;

    next();
  } catch (err) {
    return res.status(401).json(err.message);
  }
};