// const error = {
//   codeStatus: {
//     ok: 200,
//     created: 201,
//     noContent: 204,
//     badRequest: 400,
//     unauthorized: 401,
//     forbidden: 403,
//     notFound: 404,
//     conflict: 409,
//   },
//   errorMessage: {
//     invalidEntries: 'Invalid entries. Try again.',
//     alreadyRegistered: 'Email already registered',
//     noData: 'All fields must be filled',
//     incorretData: 'Incorret username or password',
//     jwtProblem: 'jwt malformed',
//     noRecipe: 'recipe not found',
//     noToken: 'missing auth token',
//     noPermission: 'Only admins can register new admins',
//   },
// };

const cases = (message) => {
  switch (message) {
    case 'Invalid entries. Try again.':
      return 400;
    case 'All fields must be filled' || '"password" is not allowed to be empty':
      return 401;
    default:
      return 500;
  }
};

const error = (err, _req, res, _next) => {
  let code;
  if (err.isJoi) {
    code = cases(err.details[0].message);
    return res.status(code).json({ message: err.details[0].message });
  }
  return res.status(err.code || 500)
    .json({ message: err.message });
};

module.exports = error;
