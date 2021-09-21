const handleError = (err, res) => {
  const { statusCode, message } = err;
  return res.status(statusCode).json({
    message,
  });
};

module.exports = {
  handleError,
};