const jwt = require('jsonwebtoken');
const recipesService = require('../services/recipesService');

const status401 = 401;
const secret = 'minhaSenha';

const create = async (req, res) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;
  try {
    const { email } = jwt.verify(token, secret);
    const result = await recipesService.create({ email, name, ingredients, preparation });
    return res.status(201).json(result);
  } catch (err) {
    return res.status(status401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  create,
};