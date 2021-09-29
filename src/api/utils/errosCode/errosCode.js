module.exports = {
  invalidEntries: {
    status: 400,
    message: 'Invalid entries. Try again.',
  },

  emailRegistred: {
    status: 409,
    message: 'Email already registered',
  },

  loginNotFilled: {
    status: 401,
    message: 'All fields must be filled',
  },

  loginIncorrect: {
    status: 401,
    message: 'Incorrect username or password',
  },

  missingToken: {
    status: 401,
    message: 'missing auth token',
  },

  jwtMalformed: {
    status: 401,
    message: 'jwt malformed',
  },

  recipeNotFound: {
    status: 404,
    message: 'recipe not found',
  },
};
