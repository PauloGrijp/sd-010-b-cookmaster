module.exports = (err, _req, res, _next) => {
  res.status(err.number).json(err.error);
};
