const jwt = require('jsonwebtoken');
// const service = require('../services/serviceUsers');
// const model = require('../models/modelUsers');

const secret = 'tokensecreto';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'jwt malformed' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const { data } = decoded;
    // console.log(data);

    req.user = data;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'jwt malformed' });
  }
};

module.exports = {
  validateToken,
};

// const validateJWT = async (token) => {
//   if (!token) {
//     return { message: 'jwt malformed' };
//   }

//   const decoded = jwt.verify(token, secret);

//   // console.log(decoded);

//   const user = await model.findEmail(decoded.data.email);
//   // console.log(user);
//   if (!user) {
//     return { message: 'Erro ao procurar email' };
//   }

//   return user;
// };

// module.exports = validateJWT;