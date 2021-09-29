const jwt = require('jsonwebtoken');
// const service = require('../services/serviceUsers');
const model = require('../models/modelUsers');

const secret = 'tokensecreto';

// module.exports = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Token não encontrado' });
//   }

//   try {
//     const decoded = jwt.verify(token, secret);

//     const user = await service.login(decoded.data.email);

//     if (!user) {
//       return res.status(401).json({ message: 'Erro ao procurar email' });
//     }

//     res.user = user;

//     next();
//   } catch (err) {
//     return res.status(401).json(err.message);
//   }
// };

const validateJWT = async (token) => {
  if (!token) {
    return { message: 'jwt malformed' };
  }

  const decoded = jwt.verify(token, secret);

  // console.log(decoded);

  const user = await model.findEmail(decoded.data.email);
  // console.log(user);
  if (!user) {
    return { message: 'Erro ao procurar email' };
  }

  return user;
};

module.exports = validateJWT;