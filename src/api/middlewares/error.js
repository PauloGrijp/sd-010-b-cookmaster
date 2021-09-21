const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res, _next) => {  
  if (!err.codeError) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.isErrorMessage });
  }
  
  let status = 500;

  switch (err.codeError) {
    case 'not_found':
      status = 404;
      break;
    // case 'invalid_data':
    //   status = 422;
    //   break;
    case 'bad_request':
      status = 400;
      break;
    case 'conflict':
      status = 409;
      break;
    default:
      break;
  }

  res.status(status).json({ message: err.isErrorMessage });
};
