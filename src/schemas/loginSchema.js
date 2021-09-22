const codes = {
  UNAUTHORIZED: 401,
};

const errors = {
  FIELD_BLANK: 'All fields must be filled',
  INVALID_EMAIL: 'Incorrect username or password',
};

const invalidEntries = { code: codes.UNAUTHORIZED, message: errors.FIELD_BLANK };
const invalidEmail = { code: codes.UNAUTHORIZED, message: errors.INVALID_EMAIL };

const blank = ({ email, password }) => (!email || !password);

const invalid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  return !regex.test(email);
};

const validate = ({ email, password }) => {
  switch (true) {
    case blank({ email, password }): return invalidEntries;
    case invalid(email): return invalidEmail;
    default: return false;
  }
};

module.exports = {
  validate,
};
