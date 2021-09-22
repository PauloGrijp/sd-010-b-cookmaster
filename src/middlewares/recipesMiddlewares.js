const status400 = 400;

const validateCreateFields = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(status400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = {
  validateCreateFields,
};