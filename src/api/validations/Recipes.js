const { ObjectId } = require('mongodb');

const errors = {
  emptyInputs: 'Invalid entries. Try again.',
};

const checkEmptyInputs = ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) return { message: errors.emptyInputs };
  
  return {};
};

const checkId = async (id) => ObjectId.isValid(id);

module.exports = {
  checkEmptyInputs,
  checkId,
};
