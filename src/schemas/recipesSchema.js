const codes = {
  BAD_REQUEST: 400,
};

const errors = {
  FIELD_BLANK: 'Invalid entries. Try again.',
};

const invalidEntries = { code: codes.BAD_REQUEST, message: errors.FIELD_BLANK };

const blank = ({ name, ingredients, preparation }) => (!name || !ingredients || !preparation);

const validate = ({ name, ingredients, preparation }) => {
  switch (true) {
    case blank({ name, ingredients, preparation }): return invalidEntries;
    default: return false;
  }
};

module.exports = {
  validate,
};
