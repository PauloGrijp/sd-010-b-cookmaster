const errosCode = require('../utils/errosCode');

module.exports = (err, _req, res, _next) => {
  if (err.code) {
    const { status, message } = errosCode[err.code];
    return res.status(status).json({ message });
  }
  return res.status(500).json({ message: 'Erro' });
};
