const jwt = require('jsonwebtoken');

const secret = 'aoba';

const validatedToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const tokenIsValid = jwt.verify(token, secret);
    if (!tokenIsValid) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    console.log(tokenIsValid);
    req.userId = tokenIsValid;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

const validatedApi = (req, res, next) => {
  console.log('2');
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  return next();
};

module.exports = { validatedToken, validatedApi };
