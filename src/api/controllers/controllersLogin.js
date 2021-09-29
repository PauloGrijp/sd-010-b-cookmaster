const services = require('../services/servicesLogin');

const login = async (req, res) => services.login(req.body)
  .then(({ status, token }) => res.status(status).json({ token }));

module.exports = { login };
