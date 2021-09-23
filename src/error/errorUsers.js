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

function unauthorizedEmailPassword(response) {
  return response.status(StatusCodes.UNAUTHORIZED).json({
    message: 'All fields must be filled',
  });
}

function unauthorized(response) {
  return response.status(StatusCodes.UNAUTHORIZED).json({
    message: 'Incorrect username or password',
  });
}

module.exports = {
  badRequest,
  conflict,
  unauthorizedEmailPassword,
  unauthorized,
};