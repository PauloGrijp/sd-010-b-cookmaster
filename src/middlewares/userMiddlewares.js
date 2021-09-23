const { ObjectId } = require('bson');
const jwt = require('jsonwebtoken');
const { getUserById } = require('../controllers/userController');
const { getRecipe } = require('./recipesMiddlewares');

const secret = 'minhaSenha';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  jwt.verify(token, secret);
  return next();
};

const validateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  const { role } = jwt.verify(token, secret);
  if (role === 'admin') {
    return next();
  }
  const { id: recipeId } = req.params;
  const { userId } = await getRecipe(recipeId);
  const { _id } = await getUserById(userId);
  if (JSON.stringify(userId) === JSON.stringify(_id)) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

module.exports = {
  validateJWT,
  validateUser,
};