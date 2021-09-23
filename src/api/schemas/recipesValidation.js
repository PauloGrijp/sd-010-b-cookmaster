const BAD_REQUEST = 'bad_request';
// const CONFLICT = 'conflict';
// const UNAUTHORIZED = 'unauthorized';

const ifFieldsExists = (recipe) => {
  const { name, ingredients, preparation } = recipe;
  if (!name || !ingredients || !preparation) {
    return {
      codeError: BAD_REQUEST,
      isErrorMessage: 'Invalid entries. Try again.',
    };
  }

  return true;
};

module.exports = {
  ifFieldsExists,
};