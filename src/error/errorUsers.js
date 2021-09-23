const { StatusCodes } = require('http-status-codes');

function badRequest(response) {
  return response.status(StatusCodes.BAD_REQUEST).json({
    message: 'Invalid entries. Try again.',
  });
}
function conflict(response) {
  return response.status(StatusCodes.CONFLICT).json({
    message: 'Email already registered',
  });
}

module.exports = {
  badRequest,
  conflict,
};