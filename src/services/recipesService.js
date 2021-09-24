const jwt = require('jsonwebtoken');

const erroCode = {
    BAD_REQUEST: 400,
    Unauthorized: 401,
    NotFound: 404,
};

const message = {
    BAD_REQUEST: 'Invalid entries. Try again.',
    Unauthorized: 'jwt malformed',
    NotFound: 'recipe not found',
    notAdmin: 'missing auth token',

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

const validateAdminToken = (req, res, next) => {
    const token = req.headers.authorization;
 
    if (!token) {
     return res.status(erroCode.Unauthorized).json({ message: message.notAdmin });
    }
    try {
     jwt.verify(token, secret);
     next(); 
    } catch (error) {
     return res.status(erroCode.Unauthorized).json({ message: message.Unauthorized });
    }
 };

 const validateTokenForDelete = (req, res, next) => {
    const token = req.headers.authorization;
 
    if (!token) {
     return res.status(erroCode.Unauthorized).json({ message: message.notAdmin });
    }
    try {
     jwt.verify(token, secret);
     next(); 
    } catch (error) {
     return res.status(erroCode.Unauthorized).json({ message: message.notAdmin });
    }
 };

const validateId = (req, res, next) => {
    const { id } = req.params;

    if (id.length !== 24 || typeof id !== 'string') {
        return res.status(erroCode.NotFound).json({ message: message.NotFound });
    }

    next();
};

module.exports = { 
    recipeFields,
    validateToken,
    validateId,
    validateAdminToken,
    validateTokenForDelete,

};