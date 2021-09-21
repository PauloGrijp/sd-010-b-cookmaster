// const INVALID_DATA_CODE = 422;
const INTERNAL_SERVER_ERROR_CODE = 500;

// const checkErrorType = (err) => {
//   switch (err) {
//     case err.invalidEntries:
//       return { code: 400, message: 'Invalid entries. Try again.' };
//     case err.emailExists:
//       return { code: 409, message: 'Email already registered.' };
//     case err.fieldsRequired:
//       return { code: 401, message: 'All fields must be filled.' };
//     case err.incorrectUserInfo:
//       return { code: 401, message: 'Incorrect username or password' };
//     case err.jwtMalformed:
//       return { code: 401, message: 'jwt malformed' };
//   }
// };

module.exports = (err, _req, res, _next) => {
  if (err.invalidEntries) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (err.emailExists) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  if (err.fieldsRequired) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  if (err.incorrectUserInfo) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  
  res
    .status(INTERNAL_SERVER_ERROR_CODE)
    .json({ err: { code: 'internal', message: 'Internal server error' } });
};
