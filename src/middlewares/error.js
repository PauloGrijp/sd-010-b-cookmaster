module.exports = (err, _req, res, _next) => {
  if ('code' in err) {
    return res.status(err.code).json({ message: err.message });
  }

  return res.status(500).json('Algo deu ruim :(');
};