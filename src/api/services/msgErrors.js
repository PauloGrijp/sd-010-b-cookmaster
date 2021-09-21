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

const ERROR_EMPTY_FIELDS = {
  status: 401,
  err: {
    message: 'All fields must be filled',
  },
};

const ERROR_INVALID_DATA = {
  status: 401,
  err: {
    message: 'Incorrect username or password',
  },
};

module.exports = {
  ERROR_INVALID_ENTRIES,
  ERROR_EMAIL_CONFLICT,
  ERROR_EMPTY_FIELDS,
  ERROR_INVALID_DATA,
};
