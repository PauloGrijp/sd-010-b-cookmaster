const errorMidllewares = (err, _req, res, _next) => {
  if (err.isError) {
    return res.status(409).json({ message: err.message });
  }
};

module.exports = {
  errorMidllewares,
};