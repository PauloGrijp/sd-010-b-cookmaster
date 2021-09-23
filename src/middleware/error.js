module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res
      .status(400)
      .json({ message: 'Invalid entries. Try again.' });
  }
};