// const INVALID_DATA_CODE = 422;
// const INTERNAL_SERVER_ERROR_CODE = 500;

const checkErrorType = (err) => {
  switch (true) {
    case err.onlyAdmin:
      return { code: 403, message: 'Only admins can register new admins' };

    default:
      return { code: 500, message: 'Internal server error' };
  }
};

module.exports = (err, _req, res, _next) => {
  const { code, message } = checkErrorType(err);

  res
    .status(code)
    .json({ message });
};
