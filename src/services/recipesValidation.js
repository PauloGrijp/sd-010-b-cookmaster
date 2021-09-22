// const recipesModel = require('../models/recipes');

const invalidEntries = { message: 'Invalid entries. Try again.' };

const dataValidation = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) { return res.status(400).json(invalidEntries); }
  next();
};

module.exports = { dataValidation };