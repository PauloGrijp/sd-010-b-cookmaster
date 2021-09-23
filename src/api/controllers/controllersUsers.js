const services = require('../services/servicesUsers');

const create = async (req, res) => services.create(req.body)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = { create };
