const jwt = require('jsonwebtoken');

const secret = 'o palmeiras não tem mundial';

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'missing auth token' });
    
    const tokenIsValid = jwt.verify(token, secret);
  
    req.userId = tokenIsValid;

    if (!tokenIsValid) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' }); 
  }
};

const validateRecipes = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  return next();
};

module.exports = {
  validateRecipes,
  validateToken,
};