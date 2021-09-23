const { StatusCodes } = require('http-status-codes');

const checkValues = (req, res, next) => {
  const recipe = req.body;
  if (!recipe.name || !recipe.ingredients || !recipe.preparation) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }
  
  next();
};

module.exports = { checkValues };
