const services = require('../services/servicesUsers');

const create = async (req, res) => services.create(req.body)
  .then(({ status, user }) => res.status(status).json({ user }));

const login = async (req, res) => services.login(req.body)
  .then(({ status, token }) => res.status(status).json({ token }));

module.exports = { create, login };
