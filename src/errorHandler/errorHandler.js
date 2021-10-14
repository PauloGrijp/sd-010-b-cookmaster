const httpCodes = require('../constants/httpCodes.json');

const AppError = require('./AppError');

const errorHandler = (errorObj, res) => {
  if (errorObj instanceof AppError) {
    console.log(errorObj);
    return res.status(errorObj.code).json({ message: errorObj.message });
  }
  console.error(errorObj);
  return res.status(httpCodes.HTTP_INTERNAL_ERROR).end();
};

module.exports = errorHandler;
