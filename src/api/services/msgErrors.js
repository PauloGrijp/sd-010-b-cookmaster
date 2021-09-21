const ERROR_INVALID_ENTRIES = {
  status: 400,
  err: {
    message: 'Invalid entries. Try again.',
  },
};

const ERROR_EMAIL_CONFLICT = {
  status: 409,
  err: {
    message: 'Email already registered',
  },
};

module.exports = {
  ERROR_INVALID_ENTRIES,
  ERROR_EMAIL_CONFLICT,
};
