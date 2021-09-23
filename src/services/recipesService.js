const jwt = require('jsonwebtoken');

const erroCode = {
    BAD_REQUEST: 400,
    Unauthorized: 401,
};

const message = {
    BAD_REQUEST: 'Invalid entries. Try again.',
    Unauthorized: 'jwt malformed',

};

const secret = 'programadorNaoTemFeriadoNemFinalDeSemana';

const recipeFields = (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
        return res.status(erroCode.BAD_REQUEST).json({ message: message.BAD_REQUEST });
    }
    next();
  };

const validateToken = (req, res, next) => {
   const token = req.headers.authorization;

   if (!token) {
    return res.status(erroCode.Unauthorized).json({ message: message.Unauthorized });
   }
   try {
    jwt.verify(token, secret);
    next(); 
   } catch (error) {
    return res.status(erroCode.Unauthorized).json({ message: message.Unauthorized });
   }
};

module.exports = { 
    recipeFields,
    validateToken,

};