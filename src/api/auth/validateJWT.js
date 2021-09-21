const jwt = require('jsonwebtoken');
const Models = require('../../models');

const segredo = 'cookmaster';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, segredo);
    const user = await Models.user.findByEmail(decoded.email);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    
    const { _id } = user;

    req.userId = _id;

    next();
  } catch (err) {
    if (err.message === 'jwt must be provided') { err.message = 'missing auth token'; }
    
    return res.status(401).json({ message: err.message });
  }
};
