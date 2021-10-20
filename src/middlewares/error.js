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

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const INTERNAL_SERVER_ERROR = 500;

const cases = (message) => {
  switch (message) {
    case 'Invalid entries. Try again.':
      return BAD_REQUEST;
    case 'All fields must be filled' || '"password" is not allowed to be empty':
      return UNAUTHORIZED;
    default:
      return INTERNAL_SERVER_ERROR;
  }
};

module.exports = (err, _req, res, _next) => {
  let code;
  if (err.isJoi) {
    code = cases(err.details[0].message);
    return res.status(code).json({ message: err.details[0].message });
  }
  return res.status(err.code || INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
};
