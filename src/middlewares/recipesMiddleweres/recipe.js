const jwt = require('jsonwebtoken');

const TOKEN_ERROR_MSG = 'jwt malformed';

const validateRecipe = (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
 return res.status(400).json({
        message: 'Invalid entries. Try again.',
    }); 
}
next();
};

const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    const segredo = 'seusecretdetoken';

    if (!token) {
        return res.status(401).json({ message: 'missing auth token' });
      }
      try {
        const decoded = jwt.verify(token, segredo);
        const userWithoutPassword = {
            username: decoded.payload.email,
            role: decoded.payload.role,
            userId: decoded.payload.userId,
        };
 
          req.user = userWithoutPassword;
          console.log(req.user, 'decoded', decoded);

          next();
  } catch (err) {
    return res.status(401).json({ message: TOKEN_ERROR_MSG });
  }
};
module.exports = { validateRecipe, validateToken };