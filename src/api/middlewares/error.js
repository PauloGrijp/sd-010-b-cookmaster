const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res, _next) => {
  let status = StatusCodes.INTERNAL_SERVER_ERROR;

  switch (err.codeError) {
    case 'not_found':
      status = StatusCodes.NOT_FOUND;
      break;
    case 'unauthorized':
      status = StatusCodes.UNAUTHORIZED;
      break;
    case 'bad_request':
      status = StatusCodes.BAD_REQUEST;
      break;
    case 'conflict':
      status = StatusCodes.CONFLICT;
      break;
    default:
      break;
  }

  res.status(status).json({ message: err.isErrorMessage });
};
