const codes = {
  BAD_REQUEST: 400,
};

const errors = {
  FIELD_BLANK: 'Invalid entries. Try again.',
};

const invalidEntries = { code: codes.BAD_REQUEST, message: errors.FIELD_BLANK };

const blank = ({ name, email, password }) => (!name || !email || !password);

const invalid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  return !regex.test(email);
};

const validate = ({ name, email, password }) => {
  switch (true) {
    case blank({ name, email, password }): return invalidEntries;
    case invalid(email): return invalidEntries;
    default: return false;
  }
};

module.exports = {
  validate,
};
