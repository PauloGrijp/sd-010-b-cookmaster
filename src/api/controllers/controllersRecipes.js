const services = require('../services/servicesRecipes');

const create = async (req, res) => services.create(req.body, req.user)
  .then(({ status, recipe }) => res.status(status).json({ recipe }));

module.exports = { create };
