const { ObjectId } = require('mongodb');
const { findById } = require('../models/recipe.models');

const isValidFields = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const checkRole = async (req, res, next) => {
  const { _id, role } = req.user;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  if (role === 'admin') {
    return next();
  }

  const recipeToBeUpdated = await findById(id);
  const { userId } = recipeToBeUpdated;

  if (_id.toString() !== userId.toString()) {
    return res.status(403).json({ message: 'you are not allowed to update this recipe' });
  }

  next();
};

module.exports = {
  isValidFields,
  checkRole,
};