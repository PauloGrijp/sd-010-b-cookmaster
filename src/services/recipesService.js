const validateFields = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return false;
  return true;
};

module.exports = { validateFields };
