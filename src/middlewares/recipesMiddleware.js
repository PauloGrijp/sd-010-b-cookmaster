const RecipesSchema = require('../schemas/recipesSchema');

const validateInputs = (req, res, next) => {
  const recipe = req.body;
  const { code, message } = RecipesSchema.validate(recipe);

  if (code) {
    return res.status(code).json({ message });
  }

  next();
};

module.exports = {
  validateInputs,
};
