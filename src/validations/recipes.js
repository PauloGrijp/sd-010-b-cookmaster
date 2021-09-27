const validateInputs = (recipe) => {
  const { name, ingredients, preparation } = recipe;

  if (!name || !ingredients || !preparation) return false;
};

module.exports = {
  validateInputs,
};
