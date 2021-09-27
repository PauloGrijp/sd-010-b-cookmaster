const error = (code, message) => ({
  isError: true,
  code,
  message,
});

module.exports = {
  errorBusiness: (message) => error(400, message),
  errorEmail: (message) => error(409, message),
  errorLogin: (message) => error(401, message),
  errorByIdRecipes: (message) => error(404, message),
};