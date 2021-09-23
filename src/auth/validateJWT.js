const jwt = require('jsonwebtoken');
const model = require('../models/modelJWT');
const { MESSAGE } = require('../helpers/responses');

const secret = 'segredoLotar';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json(MESSAGE.MISSING_AUTH_TOKEN);
  }

  try {
    const decoded = jwt.verify(token, secret);
    const { email, password } = decoded.data;

    const user = await model.findUser({ email, password });
      // console.log(user);
      
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};