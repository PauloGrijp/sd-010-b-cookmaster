const Error = require('../utils/createObjError');

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) next(Error.unauthorized('All fields must be filled'));
  next();
};
