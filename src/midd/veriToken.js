const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const secret = 'secretToken';

const veriToken = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ code: 401, message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await UserModel.getUser(decoded.email);

    if (!user) {
      return next({ code: 401, message: 'Erro ao procurar usuário do token.' });
    }

    const { _id, password, ...userWithOutPasswor } = decoded;

    req.user = { id: _id, ...userWithOutPasswor };

    next();
  } catch (err) {
    return next({ code: 401, message: err.message });
  }
};

module.exports = veriToken;