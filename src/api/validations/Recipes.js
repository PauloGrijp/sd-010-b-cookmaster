const errors = {
  emptyInputs: 'Invalid entries. Try again.',
};

const checkEmptyInputs = ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) return { message: errors.emptyInputs };
  
  return {};
};

module.exports = {
  checkEmptyInputs,
};
