const recipes = require('../schemas/recipes');

module.exports = (req, res, next) => {
  const { error } = recipes.validate(req.body);
  if (error) next(error);
  next();
};
