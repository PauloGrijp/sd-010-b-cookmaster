const BAD_REQUEST = 400;
const errors = {
  nameBlank: 'Invalid entries. Try again.',
};

const invalidEntries = { code: BAD_REQUEST, message: errors.nameBlank };

const blank = (value) => (!value);
const invalid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  return !regex.test(email);
};

const validate = ({ name, email, password }) => {
  switch (true) {
    case blank(name): return invalidEntries;
    case blank(email): return invalidEntries;
    case invalid(email): return invalidEntries;
    case blank(password): return invalidEntries;
    default: return false;
  }
};

module.exports = {
  validate,
};
