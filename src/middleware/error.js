const middlewareError = (error, _req, res, _next) => {
  console.log(error);
  if (error.isError) {
    return res.status(error.code).json({ message: error.message });
  }
};

module.exports = middlewareError;
