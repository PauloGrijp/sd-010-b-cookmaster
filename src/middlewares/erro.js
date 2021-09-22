const error = (err, _req, res, _next) => {
const { message } = err;
const statusCode = {
  'Invalid entries. Try again.': 400,
  'Email already registered': 409,
  'Incorrect username or password': 401,
  'All fields must be filled': 401,
  'jwt malformed': 401,
  'recipe not found': 404,
};
if (statusCode[message]) return res.status(statusCode[message]).json(err);
return res.status(500).send('..something is wrong');
};

module.exports = error;