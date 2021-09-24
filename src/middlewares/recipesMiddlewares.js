const validate = require('../helpers/validateRecipes');
const Error = require('../helpers/errorUsers');

const recipesValidate = (req, res, next) => {
  const { error } = validate.schemaRecipes.validate(req.body);
  const { code, message } = Error.badRequest('Invalid entries. Try again.');
  if (error) {
    return res.status(code).json({
      message,
    });
  }
  next();
};

module.exports = recipesValidate;
