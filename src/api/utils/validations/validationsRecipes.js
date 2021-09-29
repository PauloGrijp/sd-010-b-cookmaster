const {
  INVALID_ENTRIES,
} = require('../errosCode/errosMessage');

const err = (statusCode) => ({ statusCode });

const recipesName = (name) => {
  if (!name || typeof name !== 'string') throw err(INVALID_ENTRIES);
};

const recipesIngredients = (ingredients) => {
  if (!ingredients || typeof ingredients !== 'string') throw err(INVALID_ENTRIES);
};

const recipesPreparation = (preparation) => {
  if (!preparation || typeof preparation !== 'string') throw err(INVALID_ENTRIES);
};

module.exports = {
  recipesName,
  recipesIngredients,
  recipesPreparation,
};
