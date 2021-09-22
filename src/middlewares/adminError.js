const checkErrorType = (err) => {
  switch (true) {
    case err.onlyAdmin:
      return { code: 403, message: 'Only admins can register new admins' };
      
    case err.invalidEntries:
      return { code: 400, message: 'Invalid entries. Try again.' };

    case err.emailExists:
      return { code: 409, message: 'Email already registered' };

    default:
      return { code: 500, message: 'Internal server error' };
  }
};

module.exports = (err, _req, res, _next) => {
  const { code, message } = checkErrorType(err);

  res.status(code).json({ message });
};
