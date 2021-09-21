const BAD_REQUEST = 400;

const validate = (name) => {
  if (!name) return { code: BAD_REQUEST, message: 'Invalid entries. Try again.' };

  return false;
};

module.exports = {
  validate,
};
