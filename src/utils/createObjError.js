const error = (statusCode, message) => ({
  isError: true,
  code: +statusCode,
  message,
});

module.exports = {
  conflict: (message) => error('409', message),
  unauthorized: (message) => error('401', message),
  notFound: (message) => error('404', message),
};
