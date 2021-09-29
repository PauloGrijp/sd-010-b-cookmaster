const notHaveCase = (name, ingredients, preparation) => !name || !ingredients || !preparation;

const validateRecipe = async ({ name, ingredients, preparation }) => {
  const code = 400;
  const message = 'Invalid entries. Try again.';

  if (notHaveCase(name, ingredients, preparation)) return { code, message };
  return {};
};

module.exports = {
  validateRecipe,
};