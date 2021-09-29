const services = require('../services/servicesRecipes');

const create = async (req, res) => services.create(req.body, req.user)
  .then(({ status, recipe }) => res.status(status).json({ recipe }));

const getAll = async (_req, res) => services.getAll()
  .then(({ status, data }) => res.status(status).json(data));

module.exports = { create, getAll };
