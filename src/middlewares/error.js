const error = {
  codeStatus: {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
  },
  errorMessage: {
    invalidEntries: 'Invalid entries. Try again.',
    alreadyRegistered: 'Email already registered',
    noData: 'All fields must be filled',
    incorretData: 'Incorret username or password',
    jwtProblem: 'jwt malformed',
    noRecipe: 'recipe not found',
    noToken: 'missing auth token',
    noPermission: 'Only admins can register new admins',
  },
};

module.exports = {
  error,
};
