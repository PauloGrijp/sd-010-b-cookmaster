const JWT = require('jsonwebtoken');
const Joi = require('joi');

const SECRET = 'senhasupersecreta123';

const validToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing token' });
  }
  try {
    const decryption = JWT.verify(token, SECRET);
    req.user = decryption;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });    
  }
};

const validRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });
  if (error) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = { validToken, validRecipe };