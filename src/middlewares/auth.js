const jwt = require('jsonwebtoken');
const UsersModel = require('../models/usersModel');

const jwtSecretForThisProject = 'xablauzadaDaGalera';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretForThisProject);

    const user = await UsersModel.findUserByEmail(decoded.user.email);

    if (!user || decoded.user.password !== user.password) {
      return res.status(401).json({
        message: 'Não foi possível encontrar usuário informado no token',
      }); 
    }

    req.user = user;

    next();
  } catch (err) {
    // Ou { message: 'jwt malformed'} se o token for inválido e essa não for a resposta do jwt
    return res.status(401).json({ message: err.message });
  }
};
