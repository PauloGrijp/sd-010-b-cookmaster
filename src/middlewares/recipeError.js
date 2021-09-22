const checkErrorType = (err) => {
  switch (true) {
    case err.invalidEntries:
      return { code: 400, message: 'Invalid entries. Try again.' };

    case err.notFound:
      return { code: 404, message: 'recipe not found' };

    case err.fieldsRequired:
      return { code: 401, message: 'All fields must be filled' };

    case err.incorrectUserInfo:
      return { code: 401, message: 'Incorrect username or password' };

    default:
      return { code: 500, message: 'Internal server error' };
  }
};

module.exports = (err, _req, res, _next) => {
  const { code, message } = checkErrorType(err);

  res.status(code).json({ message });
};
