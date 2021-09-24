const { StatusCodes } = require('http-status-codes');
const validate = require('../helpers/validateUser');

const userValidate = (req, res, next) => {
  const { error } = validate.schemaUser.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  userValidate,
};