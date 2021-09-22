const codes = require('../httpcodes');

module.exports = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { error: { code: codes.badRequest, message: 'Invalid entries. Try again.' } };
  }

  return false;
};
