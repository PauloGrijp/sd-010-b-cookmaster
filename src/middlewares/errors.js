module.exports = (err, _req, res, _next) => {
  const statusCode = {
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    conflict: 409,
  };
  const code = statusCode[err.name] || 500;
  return res.status(code).json({ message: err.message });
};
