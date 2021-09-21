const jwt = require('jsonwebtoken');
const Models = require('../../models');

const segredo = 'cookmaster';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'jwt malformed' });

  try {
    const decoded = jwt.verify(token, segredo);

    const user = await Models.user.findByEmail(decoded.email);
    const { _id } = user;
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.userId = _id;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
