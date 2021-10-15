const jwt = require('jsonwebtoken');
const UsersModel = require('../models/usersModel');

const jwtSecretForThisProject = 'xablauzadaDaGalera';

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretForThisProject);

    const user = await UsersModel.findUserByEmail(decoded.email);

    if (!user || decoded.password !== user.password) {
      return res.status(401).json({
        message: 'Não foi possível encontrar usuário informado no token',
      }); 
    }

    req.user = user;

    next();
  } catch (_err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  auth,
};
