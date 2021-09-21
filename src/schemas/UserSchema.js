const BAD_REQUEST = 400;
const errors = {
  nameBlank: 'Invalid entries. Try again.',
};

const blank = (value) => (!value);

const validate = (name) => {
  switch (true) {
    case blank(name): return { code: BAD_REQUEST, message: errors.nameBlank };
    default: return false;
  }
};

module.exports = {
  validate,
};
