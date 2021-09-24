const validate = require('../helpers/validateUser');
const Error = require('../helpers/errorUsers');

const userValidate = (req, res, next) => {
  const { error } = validate.schemaUser.validate(req.body);
  const { message, code } = Error.badRequest('Invalid entries. Try again.'); 
  if (error) {
    return res.status(code).json({
      message,
    });
  }
  next();
};

module.exports = {
  userValidate,
};