// const { ObjectId } = require('mongodb');
const connection = require('../mongoDBConnection');
const services = require('../3Services/users');

const getAll = async () => {
  const db = await connection();
  await services.getAll();
  return db;
};

const getById = async (_id) => {
  const db = await connection();
  await services.getById();
  return db;
};

const create = async () => {
  const db = await connection();
  await services.create();
  return db;
};

const update = async (_id) => {
  const db = await connection();
  await services.update();
  return db;
};

const remove = async (_id) => {
  const db = await connection();
  await services.remove();
  return db;
};

module.exports = { getAll, getById, create, update, remove };