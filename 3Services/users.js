// const validations = require('./validations');
const models = require('../4Models/users');

const getAll = async () => {
  await models.getAll();
};

const getById = async () => {
  await models.getById();
};

const create = async () => {
  await models.create();
};

const update = async () => {
  await models.update();
};

const remove = async () => {
  await models.remove();
};

module.exports = { getAll, getById, create, update, remove };
