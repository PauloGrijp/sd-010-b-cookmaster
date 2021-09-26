const error = (message) => ({
  isError: true,
  message,
});

module.exports = {
  errorBusiness: (message) => error(message),
  notFound: (message) => error(message),
};