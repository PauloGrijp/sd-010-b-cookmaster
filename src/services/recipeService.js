// const recipeModel = require('../models/recipeModel');

const validationEntries = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return 'Invalid entries. Try again.';
  }
};

module.exports = { validationEntries };