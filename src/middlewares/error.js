// const INVALID_DATA_CODE = 422;
const INTERNAL_SERVER_ERROR_CODE = 500;

// const checkErrorCode = (code) => {
//   switch (code) {
//     case 'not_found':
//     case 'stock_problem':
//       return 404;

//     case 'invalid_data':
//       return 422;

//     default:
//       return false;
//   }
// };

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  
  if (err.emailError) {
    return res.status(409).json(err.emailError);
  }

  res
    .status(INTERNAL_SERVER_ERROR_CODE)
    .json({ err: { code: 'internal', message: 'Internal server error' } });
};
