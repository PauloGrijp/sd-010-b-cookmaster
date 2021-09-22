const services = require('../3Services/users');

const getAll = async (_req, res) => {
  try {
    await services.getAll();
    res.status().json();
  } catch (error) {
      res.status().json(error);
  }
};

const getById = async (_req, res) => {
  try {
    await services.getById();
    res.status().json();
  } catch (error) {
    res.status().json(error);
  }
};

const create = async (_req, res) => {
  try {
    await services.create();
    res.status().json();
  } catch (error) {
      res.status().json(error);
  }
};

const update = async (_req, res) => {
  try {
    await services.update();
    res.status().json();
  } catch (error) {
    res.status().json(error);
  }
};

const remove = async (_req, res) => {
  try {
    await services.remove();
    res.status().json();
  } catch (error) {
    res.status().json(error);
  }
};

module.exports = { getAll, getById, create, update, remove };
