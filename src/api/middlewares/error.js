function error(err, _req, res, _next) {
  return res.status(err.status).json({ message: err.message });
}

module.exports = error;