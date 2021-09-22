const errorMiddleware = (err, _req, res, _next) => {
  console.log(err.message, err.statusCode);
  if (err.message && err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

module.exports = errorMiddleware;