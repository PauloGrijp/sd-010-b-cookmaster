const errosCode = require('../utils/errosCode');

module.exports = (err, _req, res, _next) => {
  if (err.statusCode) {
    const { status, message } = errosCode[err.statusCode];
    return res.status(status).json({ message });
  }
  console.log(err);
  return res.status(500).json({ message: 'Erro' });
};
