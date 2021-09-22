const invalidEntries = { message: 'Invalid entries. Try again.' };
const BAD_REQUEST = 400;

const isValidIngredients = (req, res, next) => {
  const { ingredients } = req.body;
  if (!ingredients || typeof ingredients !== 'string') {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }

  next();
};

const isValidPreparation = (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation || typeof preparation !== 'string') {
    return res.status(BAD_REQUEST).json(invalidEntries);
  }

  next();
};

module.exports = {
  isValidIngredients,
  isValidPreparation,
};
