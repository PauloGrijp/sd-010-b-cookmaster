module.exports = (err, _req, res, _next) => {
  console.log(err);
  res.status(err.number).json(err.error);
};
